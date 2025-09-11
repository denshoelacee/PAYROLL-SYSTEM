<?php

namespace App\Repository;

use App\Contracts\Repository\ContributionTypeRepositoryInterface;
use App\Contracts\Repository\PayrollDeductionRepositoryInterface;
use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Repository\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;
use App\Models\Payroll;
use App\Models\User;
use Carbon\Carbon;

class PayrollRepository implements PayrollRepositoryInterface{


    protected $type;
    public function __construct(
        protected UserRepositoryInterface             $userRepository,
        protected PayrollDeductionRepositoryInterface $payrollDeductionRepo,
        protected ContributionTypeRepositoryInterface $contributionTypeRepo

    ){}



    public function findHasPayrollForJobOrder($id)
    {

        $date = now();

        return Payroll::where('user', $id)
                      ->whereBetween('created_at', [
                             $date->copy()->startOfMonth(),
                             $date->copy()->endOfMonth()
                         ])
                         ->exists();
    }
     
    public function setPayrollModel(array $data):Payroll
    {

        return Payroll::create($data);

    }

    public function getSelectEmploymentSalaryType($employmentType)
    {

        if(empty($employmentType) || !in_array($employmentType, ['Regular', 'Job Order', 'Part-Time']))
        {

            return collect();

        }

        $this->type = $employmentType;
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $query = User::select([
            'user_id',
            'employee_id', 
            DB::raw("CONCAT(first_name, ', ', last_name) AS full_name")
        ]);

        switch ($employmentType) {
            case 'Regular':
                $query->where('employment_type', 'Regular')
                    ->whereDoesntHave('payrolls', function ($q) use ($startOfMonth, $endOfMonth) {
                        $q->whereBetween('created_at', [$startOfMonth, $endOfMonth])
                            ->where('payslip_type', 'Regular');
                    });
                break;

            case 'Job Order':
                $query->where('employment_type', 'Job Order')
                    ->whereHas('payrolls', function ($q) use ($startOfMonth, $endOfMonth) {
                        $q->whereBetween('created_at', [$startOfMonth, $endOfMonth])
                            ->where('payslip_type', 'Job Order');
                    }, '<', 2);
                break;

            case 'Part-Time':
                $query->whereIn('employment_type', ['Regular', 'Job Order', 'Part-Time'])
                    ->whereDoesntHave('payrolls', function ($q) use ($startOfMonth, $endOfMonth) {
                        $q->whereBetween('created_at', [$startOfMonth, $endOfMonth])
                            ->whereIn('payslip_type', ['Part-Time', 'Regular|Part-Time', 'Job Order|Part-Time']);
                    });
                break;
        }

        return $query->get();

    }

    /**
     * Summary of getUsersWithoutPayrollForCurrentMonth
     * 
     * @param mixed $id  User id
     * @param mixed $selectedType  Employment Type (Regular,JO,Part-Time)
     * @return object|User|\Illuminate\Database\Eloquent\Model|null
     */
    public function getUsersWithoutPayrollForCurrentMonth($id, $selectedType)
    {
        $user = User::select(['user_id', 'basic_pay', 'employment_type']) 
            ->where('user_id', $id)
            ->first();

        if (!$user) {
            return null;
        }

        // Check if the selected type is valid for this user
        $canWorkSelectedType = ($selectedType === 'Part-Time') 
            ? in_array($user->employment_type, ['Regular', 'Job Order', 'Part-Time'])
            : str_contains($user->employment_type, $selectedType);
            
        if (!$canWorkSelectedType) {
            return null;
        }

        // Determine what payroll employment type to look for
        if ($selectedType === 'Part-Time' && $user->employment_type !== 'Part-Time') {
            $payrollType = $user->employment_type . '|Part-Time';
        } else {
            $payrollType = $selectedType;
        }

        // Get latest payroll for this EXACT specific type only
        $latestPayroll = Payroll::where('user_id', $id)
            ->where('payslip_type', $payrollType)
            ->latest('created_at')
            ->first();

        // Set the relationship manually
        $user->setRelation('latestPayroll', $latestPayroll);
        
        return $user;
    }


    public function payrollModel(int $id): ?Payroll
    {

        return Payroll::where('payroll_id', $id)->firstOrFail();

    }

    public function updatePartial(array $data,$id): void
    {

       $payroll = $this->payrollModel($id);
       $payroll->update($data);

    }

    public function updatePublish(array $data,$id): void
    {

        $user = $this->userRepository->findById($data['user_id']);
        $salary = $user->basic_pay;

          $rlipContribution = $this->contributionTypeRepo->rlipDeduction($salary);
          $philContribution = $this->contributionTypeRepo->philDeduction($salary);
          $totalContribution = $rlipContribution + $philContribution;

          $totalAccruedPeriod = $salary + ($data['pera'] ?? 0);
          $totalDeduction = $this->payrollDeductionRepo->calculateTotalDeduction($data,$totalContribution);
          $netPay = $totalAccruedPeriod - $totalDeduction;

           $data['rlip'] = $rlipContribution;
           $data['philhealth'] = $philContribution;
           $data['basic_salary'] = $salary;

        $payroll = $this->payrollModel($id);
        $payroll->deduction()->update([
            'total_accrued_period' => $totalAccruedPeriod,
            'total_deduction' => $totalDeduction,
            'net_pay' => $netPay
       ]);
       $payroll->update($data);
    }

    public function getUserPayrollMonthly($year, $month)
    {

         return DB::table('users')
            ->leftJoin('payrolls', 'users.user_id', '=', 'payrolls.user_id')
            ->select([
                'users.user_id',
                'users.employee_id',
                DB::raw("CONCAT(first_name,', ',last_name) AS full_name"),
                'payrolls.assigned_designation',
                'payrolls.assigned_department',
                'payrolls.payslip_type', 
                'payrolls.payslip_id',  
                'payrolls.publish_status',
                'payrolls.payroll_id',  
                'payrolls.created_at'                                                    
            ]) 
            ->whereMonth('payrolls.created_at', $month)
            ->whereYear('payrolls.created_at', $year)
            ->get();
    }

    /**
     * View the specified payslip
     * 
     * @param mixed $payslip_id
     * 
     */
    public function getViewPayslipByPayslipId($payslip_id)
    {
        $payroll = Payroll::with([
            'user:user_id,last_name,first_name',
            'deduction:payroll_id,total_accrued_period,total_deduction,net_pay'
        ])
        ->select([
            'payroll_id','payslip_id', 'user_id', 'basic_salary', 'daily_rate',
            'duty_count', 'service_rendered','units', 'pera', 'absent', 'late',
            'holding_tax', 'tax_bal_due', 'rlip', 'policy_loan', 'consol_loan',
            'emerg_loan', 'gel', 'gfal', 'mpl', 'mpl_lite', 'contributions',
            'loans', 'housing_loan', 'philhealth', 'cfi', 'tipid', 'city_savings_bank',
            'fea', 'canteen', 'disallowance', 'unliquidated_ca', 'disallowance_honoraria',
            'coop', 'landbank', 'ucpb', 'sss', 'deduction1', 'deduction2','deduction3',
            'assigned_designation', 'assigned_department', 'payslip_type', 'created_at'
        ])
        ->where('payslip_id', $payslip_id)
        ->first();

        // Return null if payslip not found
        if (!$payroll) {
            return null;
        }

        // Check if user relationship exists
        if (!$payroll->user) {
            return null;
        }

        // Transform the single model instance
        return [
            'payroll_id' => $payroll->payroll_id,
            'payslip_id' => $payroll->payslip_id,
            'user_id' => $payroll->user->user_id,
            'full_name' => $payroll->user->last_name . ', ' . $payroll->user->first_name,
            'basic_salary' => $payroll->basic_salary,
            'daily_rate' => $payroll->daily_rate,
            'duty_count' => $payroll->duty_count,
            'service_rendered' => $payroll->duty_count,
            'units' => $payroll->units,
            'pera' => $payroll->pera,
            'absent' => $payroll->absent,
            'late' => $payroll->late,
            'holding_tax' => $payroll->holding_tax,
            'tax_bal_due' => $payroll->tax_bal_due,
            'rlip' => $payroll->rlip,
            'policy_loan' => $payroll->policy_loan,
            'consol_loan' => $payroll->consol_loan,
            'emerg_loan' => $payroll->emerg_loan,
            'gel' => $payroll->gel,
            'gfal' => $payroll->gfal,
            'mpl' => $payroll->mpl,
            'mpl_lite' => $payroll->mpl_lite,
            'contributions' => $payroll->contributions,
            'loans' => $payroll->loans,
            'housing_loan' => $payroll->housing_loan,
            'philhealth' => $payroll->philhealth,
            'cfi' => $payroll->cfi,
            'tipid' => $payroll->tipid,
            'city_savings_bank' => $payroll->city_savings_bank,
            'fea' => $payroll->fea,
            'canteen' => $payroll->canteen,
            'disallowance' => $payroll->disallowance,
            'unliquidated_ca' => $payroll->unliquidated_ca,
            'disallowance_honoraria' => $payroll->disallowance_honoraria,
            'coop' => $payroll->coop,
            'landbank' => $payroll->landbank,
            'ucpb' => $payroll->ucpb,
            'sss' => $payroll->sss,
            'deduction1' => $payroll->deduction1,
            'deduction2' => $payroll->deduction2,
            'deduction3' => $payroll->deduction3,
            'assigned_designation' => $payroll->assigned_designation,
            'assigned_department' => $payroll->assigned_department,
            'payslip_type' => $payroll->payslip_type,
            // Safe access to deduction properties with null coalescing
            'gross_salary' => $payroll->deduction->total_accrued_period ?? 0,
            'total_deduction' => $payroll->deduction->total_deduction ?? 0,
            'net_pay' => $payroll->deduction->net_pay ?? 0,
            'date' => $payroll->created_at
        ];
    }


    private function formatPayrollPeriod($date)
    {
        $carbonDate = \Carbon\Carbon::parse($date);
        $month = $carbonDate->format('F'); // Full month name
        $year = $carbonDate->format('Y');
        $lastDay = $carbonDate->endOfMonth()->format('j'); // Last day of month
        
        return "{$month} 1–{$lastDay}, {$year}";
    }
     
    /**
     * Update the specified payroll  
     * 
     * @param string $payroll_id payroll unique id(PK)
     * @param string $type payslip type (Regular,JO,Part-Time,Regular/Part-Time,JO/Part-Time)
     * 
     */
    public function getUpdatePayslipById(string $payroll_id,string $type)
    {
        $payroll = Payroll::with(
            'user:user_id,last_name,first_name,employee_id'
        )
        ->select([
            'payroll_id','payslip_id', 'user_id', 'basic_salary', 'daily_rate',
            'duty_count', 'service_rendered','units', 'pera', 'absent', 'late',
            'holding_tax', 'tax_bal_due', 'rlip', 'policy_loan', 'consol_loan',
            'emerg_loan', 'gel', 'gfal', 'mpl', 'mpl_lite', 'contributions',
            'loans', 'housing_loan', 'philhealth', 'cfi', 'tipid', 'city_savings_bank',
            'fea', 'canteen', 'disallowance', 'unliquidated_ca', 'disallowance_honoraria',
            'coop', 'landbank', 'ucpb', 'sss', 'deduction1', 'deduction2','deduction3',
            'assigned_designation', 'assigned_department', 'payslip_type', 'created_at'
        ])
        ->where('payroll_id', $payroll_id)
        ->where('payslip_type', $type)
        ->first();

        // Return null if payslip not found
        if (!$payroll) {
            return null;
        }

        // Check if user relationship exists
        if (!$payroll->user) {
            return null;
        }

        // Transform the single model instance
       return [
            'payroll_id' => $payroll->payroll_id,
            'payslip_id' => $payroll->payslip_id,
            'employee_id' =>$payroll->user->employee_id,
            'user_id' => $payroll->user->user_id,
            'full_name' => $payroll->user->last_name . ', ' . $payroll->user->first_name,
            'basic_salary' => $payroll->basic_salary,
            'daily_rate' => $payroll->daily_rate,
            'duty_count' => $payroll->duty_count,
            'service_rendered' => $payroll->duty_count,
            'units' => $payroll->units,
            'pera' => $payroll->pera,
            'absent' => $payroll->absent,
            'late' => $payroll->late,
            'holding_tax' => $payroll->holding_tax,
            'tax_bal_due' => $payroll->tax_bal_due,
            'rlip' => $payroll->rlip,
            'policy_loan' => $payroll->policy_loan,
            'consol_loan' => $payroll->consol_loan,
            'emerg_loan' => $payroll->emerg_loan,
            'gel' => $payroll->gel,
            'gfal' => $payroll->gfal,
            'mpl' => $payroll->mpl,
            'mpl_lite' => $payroll->mpl_lite,
            'contributions' => $payroll->contributions,
            'loans' => $payroll->loans,
            'housing_loan' => $payroll->housing_loan,
            'philhealth' => $payroll->philhealth,
            'cfi' => $payroll->cfi,
            'tipid' => $payroll->tipid,
            'city_savings_bank' => $payroll->city_savings_bank,
            'fea' => $payroll->fea,
            'canteen' => $payroll->canteen,
            'disallowance' => $payroll->disallowance,
            'unliquidated_ca' => $payroll->unliquidated_ca,
            'disallowance_honoraria' => $payroll->disallowance_honoraria,
            'coop' => $payroll->coop,
            'landbank' => $payroll->landbank,
            'ucpb' => $payroll->ucpb,
            'sss' => $payroll->sss,
            'deduction1' => $payroll->deduction1,
            'deduction2' => $payroll->deduction2,
            'deduction3' => $payroll->deduction3,
            'assigned_designation' => $payroll->assigned_designation,
            'assigned_department' => $payroll->assigned_department,
            'payslip_type' => $payroll->payslip_type,
        ];
    }
    
   
   public function getEmployeePayslipReports($id, $year)
   {
      return DB::table('payrolls')
        ->join('users', 'payrolls.user_id', '=', 'users.user_id')
        ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')
        ->select([
            'users.user_id',
            'users.employee_id',
            'users.department',
            'users.designation',
            DB::raw("CONCAT(users.last_name, ', ', users.first_name) AS employee_name"),
            DB::raw('CAST(payrolls.basic_salary AS FLOAT) AS basic_salary'),
            DB::raw('CAST(payrolls.pera AS FLOAT) AS pera'),
            DB::raw('CAST(payrolls.daily_rate AS FLOAT) AS daily_rate'),
            DB::raw('CAST(payrolls.hourly_rate AS FLOAT) AS hourly_rate'),
            DB::raw('CAST(payrolls.duty_count AS FLOAT) AS duty_count'),
            DB::raw('CAST(payrolls.units AS FLOAT) AS units'),
            DB::raw('CAST(payrolls.service_rendered AS FLOAT) AS service_rendered'),
            DB::raw('CAST(payrolls.absent AS FLOAT) AS absent'),
            DB::raw('CAST(payrolls.late AS FLOAT) AS late'),
            DB::raw('CAST(payrolls.holding_tax AS FLOAT) AS holding_tax'),
            DB::raw('CAST(payrolls.tax_bal_due AS FLOAT) AS tax_bal_due'),
            DB::raw('CAST(payrolls.rlip AS FLOAT) AS rlip'),
            DB::raw('CAST(payrolls.policy_loan AS FLOAT) AS policy_loan'),
            DB::raw('CAST(payrolls.consol_loan AS FLOAT) AS consol_loan'),
            DB::raw('CAST(payrolls.emerg_loan AS FLOAT) AS emerg_loan'),
            DB::raw('CAST(payrolls.gel AS FLOAT) AS gel'),
            DB::raw('CAST(payrolls.gfal AS FLOAT) AS gfal'),
            DB::raw('CAST(payrolls.mpl AS FLOAT) AS mpl'),
            DB::raw('CAST(payrolls.mpl_lite AS FLOAT) AS mpl_lite'),
            DB::raw('CAST(payrolls.contributions AS FLOAT) AS contributions'),
            DB::raw('CAST(payrolls.loans AS FLOAT) AS loans'),
            DB::raw('CAST(payrolls.housing_loan AS FLOAT) AS housing_loan'),
            DB::raw('CAST(payrolls.philhealth AS FLOAT) AS philhealth'),
            DB::raw('CAST(payrolls.cfi AS FLOAT) AS cfi'),
            DB::raw('CAST(payrolls.tipid AS FLOAT) AS tipid'),
            DB::raw('CAST(payrolls.city_savings_bank AS FLOAT) AS city_savings_bank'),
            DB::raw('CAST(payrolls.fea AS FLOAT) AS fea'),
            DB::raw('CAST(payrolls.canteen AS FLOAT) AS canteen'),
            DB::raw('CAST(payrolls.disallowance AS FLOAT) AS disallowance'),
            DB::raw('CAST(payrolls.unliquidated_ca AS FLOAT) AS unliquidated_ca'),
            DB::raw('CAST(payrolls.disallowance_honoraria AS FLOAT) AS disallowance_honoraria'),
            DB::raw('CAST(payrolls.coop AS FLOAT) AS coop'),
            DB::raw('CAST(payrolls.landbank AS FLOAT) AS landbank'),
            DB::raw('CAST(payrolls.ucpb AS FLOAT) AS ucpb'),
            DB::raw('CAST(payroll_deductions.total_accrued_period AS FLOAT) AS gross_salary'),
            DB::raw('CAST(payroll_deductions.total_deduction AS FLOAT) AS total_deduction'),
            DB::raw('CAST(payroll_deductions.net_pay AS FLOAT) AS net_pay'),
            DB::raw('MONTH(payrolls.created_at) AS month'),
            'payrolls.created_at',
        ])
            ->where('payrolls.publish_status', 'publish')
            ->where('payrolls.user_id', $id)
            ->whereYear('payrolls.created_at', $year)
            ->get()
            ->map(function ($item) {
                $item->month_name = \Carbon\Carbon::create()->month($item->month)->format('F');
                return $item;
            });
   }

   

}
