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

    public function setPayrollModel(array $data):Payroll
    {
        return Payroll::create($data);
    }

    public function getSelectEmploymentSalaryType($employmentType)
    {
        if (empty($employmentType) || !in_array($employmentType, ['Regular', 'Job Order', 'Part-Time'])) {
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
                        ->whereIn('payslip_type', ['Part-Time', 'Regular/Part-Time', 'Job Order/Part-Time']);
                  });
            break;
    }

    return $query->get();

    }

    public function getTheEmployementRoleType()
    {
        return $this->type;
    }
    
    public function getUsersWithoutPayrollForCurrentMonth($id)
    {
         $selectedType = $this->type;
    
    $user = User::select(['user_id', 'basic_pay', 'employment_type']) 
        ->where('user_id', $id)
        ->first();

    if (!$user || !str_contains($user->employment_type, $selectedType)) {
        return null;
    }

    // Determine what payroll employment type to look for
    if ($selectedType === 'Part-Time' && $user->employment_type !== 'Part-Time') {
        $payrollType = $user->employment_type . '/Part-Time';
    } else {
        $payrollType = $selectedType;
    }

    // Get latest payroll for this specific type manually
    $latestPayroll = Payroll::where('user_id', $id)
        ->where('payslip_type', $payrollType)
        ->latest('created_at')
        ->first();

    // If no specific payroll type found, get any latest payroll for reference
    if (!$latestPayroll) {
        $latestPayroll = Payroll::where('user_id', $id)
            ->latest('created_at')
            ->first();
    }

    // Set the relationship manually
    $user->setRelation('latestPayroll', $latestPayroll);
    
    return $user;
}

private function getPayrollEmploymentType($selectedType, $userEmploymentType)
{
    // Determine the correct payroll employment type based on selection and user's permanent type
    if ($selectedType === 'Part-Time') {
        // For part-time work, determine the combined type
        if ($userEmploymentType === 'Regular') {
            return 'Regular/Part-Time';
        } elseif ($userEmploymentType === 'Job Order') {
            return 'Job Order/Part-Time';
        } else {
            return 'Part-Time'; // Pure part-time employee
        }
    } else {
        // For Regular or Job Order, use the selected type directly
        return $selectedType;
    }

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

    
    public function getViewPayslipByPayslipId($payslip_id)
    {
        $payroll = Payroll::with([
            'user:user_id,last_name,first_name',
            'deduction:payroll_id,total_accrued_period,total_deduction,net_pay'
        ])
        ->select([
            'payslip_id', 'user_id', 'basic_salary', 'daily_rate', 'duty_count',
            'service_rendered','units', 'pera', 'absent', 'late', 'holding_tax',
            'tax_bal_due', 'rlip', 'policy_loan', 'consol_loan', 'emerg_loan',
            'gel', 'gfal', 'mpl', 'mpl_lite', 'contributions', 'loans',
            'housing_loan', 'philhealth', 'cfi', 'tipid', 'city_savings_bank',
            'fea', 'canteen', 'disallowance', 'unliquidated_ca',
            'disallowance_honoraria', 'coop', 'landbank', 'ucpb', 'sss',
            'deduction1', 'deduction2', 'deduction3', 'assigned_designation',
            'assigned_department', 'payslip_type', 'created_at'
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
            'payslip_id' => $payroll->payslip_id,
            'user_id' => $payroll->user->user_id,
            'full_name' => $payroll->user->last_name . ', ' . $payroll->user->first_name,
            'basic_salary' => (float) $payroll->basic_salary,
            'daily_rate' => (float) $payroll->daily_rate,
            'duty_count' => (float) $payroll->duty_count,
            'service_rendered' => (float) $payroll->duty_count,
            'units' => (float) $payroll->units,
            'pera' => (float) $payroll->pera,
            'absent' => (float) $payroll->absent,
            'late' => (float) $payroll->late,
            'holding_tax' => (float) $payroll->holding_tax,
            'tax_bal_due' => (float) $payroll->tax_bal_due,
            'rlip' => (float) $payroll->rlip,
            'policy_loan' => (float) $payroll->policy_loan,
            'consol_loan' => (float) $payroll->consol_loan,
            'emerg_loan' => (float) $payroll->emerg_loan,
            'gel' => (float) $payroll->gel,
            'gfal' => (float) $payroll->gfal,
            'mpl' => (float) $payroll->mpl,
            'mpl_lite' => (float) $payroll->mpl_lite,
            'contributions' => (float) $payroll->contributions,
            'loans' => (float) $payroll->loans,
            'housing_loan' => (float) $payroll->housing_loan,
            'philhealth' => (float) $payroll->philhealth,
            'cfi' => (float) $payroll->cfi,
            'tipid' => (float) $payroll->tipid,
            'city_savings_bank' => (float) $payroll->city_savings_bank,
            'fea' => (float) $payroll->fea,
            'canteen' => (float) $payroll->canteen,
            'disallowance' => (float) $payroll->disallowance,
            'unliquidated_ca' => (float) $payroll->unliquidated_ca,
            'disallowance_honoraria' => (float) $payroll->disallowance_honoraria,
            'coop' => (float) $payroll->coop,
            'landbank' => (float) $payroll->landbank,
            'ucpb' => (float) $payroll->ucpb,
            'sss' => (float) $payroll->sss,
            'deduction1' => (float) $payroll->deduction1,
            'deduction2' => (float) $payroll->deduction2,
            'deduction3' => (float) $payroll->deduction3,
            'assigned_designation' => $payroll->assigned_designation,
            'assigned_department' => $payroll->assigned_department,
            'payslip_type' => $payroll->payslip_type,
            // Safe access to deduction properties with null coalescing
            'gross_salary' => (float) ($payroll->deduction->total_accrued_period ?? 0),
            'total_deduction' => (float) ($payroll->deduction->total_deduction ?? 0),
            'net_pay' => (float) ($payroll->deduction->net_pay ?? 0),
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

    public function getPayrollReportsYearly($year)
    {
        return DB::table('payrolls')
        ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')

        ->selectRaw('
            MONTH(payrolls.created_at) as month,
            SUM(payroll_deductions.total_accrued_period) as total_gross,
            SUM(payroll_deductions.total_deduction) as total_deduction,
            SUM(payroll_deductions.net_pay) as net_pay
        ')
        ->where('publish_status','publish')
        ->whereYear('payrolls.created_at', $year)
        ->groupBy(DB::raw('MONTH(payrolls.created_at)'))
        ->orderBy('month')
        ->get()
        ->map(function ($item) {
            $item->month_name = \Carbon\Carbon::create()->month($item->month)->format('F');
            $item->total_gross = (float) $item->total_gross;
            $item->total_deduction = (float) $item->total_deduction;
            $item->net_pay = (float) $item->net_pay;

            return $item;
        });
    }

    public function getPayrollReportsYearlyView($year,$month)
    {
        return  DB::table('payrolls')
        ->join('users', 'payrolls.user_id', '=', 'users.user_id')
        ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')
        ->select([
            'users.user_id',
            DB::raw("CONCAT(users.last_name, ', ',users.first_name) AS employee_name"),
            DB::raw('CAST(payrolls.basic_salary AS FLOAT) AS basic_salary'),
            DB::raw('CAST(payrolls.pera AS FLOAT) AS pera'),
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
            DB::raw('CAST((payroll_deductions.total_accrued_period) AS FLOAT) AS gross_salary'),
            DB::raw('CAST((payroll_deductions.total_deduction) AS FLOAT) AS total_deduction'),
            DB::raw('CAST((payroll_deductions.net_pay) AS FLOAT) AS net_pay'),
        ])
            ->where('publish_status', 'publish')
            ->whereMonth('payrolls.created_at', $month)
            ->whereYear('payrolls.created_at', $year)
            ->orderBy('employee_name','asc')
            ->get();
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

    public function geTotalTaxThisMonth()
    {
       return DB::table('payrolls')
                 ->selectRaw('
                COALESCE(SUM(holding_tax), 0) AS tax,
                COALESCE(SUM(tax_bal_due), 0) AS due_tax,
                COALESCE(SUM(
                    COALESCE(policy_loan, 0) +
                    COALESCE(consol_loan, 0) +
                    COALESCE(emerg_loan, 0) +
                    COALESCE(gel, 0) +
                    COALESCE(gfal, 0) +
                    COALESCE(mpl, 0) +
                    COALESCE(mpl_lite, 0) +
                    COALESCE(loans, 0) +
                    COALESCE(housing_loan, 0)
                ), 0) AS totalLoan
            ')
            ->where('publish_status', 'publish')
            ->whereBetween('created_at', [
                now()->startOfMonth(),
                now()->endOfMonth()
            ])
            ->first();
    }

   public function getLatestGrossPayMonthly()
   {
        return Payroll::join('users', 'payrolls.user_id', '=', 'users.user_id')
            ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')
            ->selectRaw('
                users.department,
                SUM(COALESCE(payroll_deductions.total_accrued_period, 0)) as total_gross
            ')
            ->where('payrolls.publish_status', 'publish')
            ->whereBetween('payrolls.created_at', [
                now()->startOfMonth(),
                now()->endOfMonth()
            ])
            ->groupBy('users.department')
            ->get();
    }

    public function getContributionsBreakdownMonthly()
    {
        $data = DB::table('payrolls')
            ->selectRaw('
                COALESCE(SUM(rlip), 0) AS gsis,
                COALESCE(SUM(contributions), 0) AS pagibig,
                COALESCE(SUM(philhealth),0) AS philhealth
            ')
            ->where('publish_status', 'publish')
            ->whereBetween('created_at', [
                now()->startOfMonth(),
                now()->endOfMonth()
            ])
            ->first();

            $data->gsis = (float) $data->gsis;
            $data->pagibig = (float) $data->pagibig;
            $data->philhealth = (float) $data->philhealth;

        return $data;

    }
}
