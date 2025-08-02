<?php

namespace App\Repository;

use App\Contracts\Repository\IContributionTypeRepository;
use App\Contracts\Repository\IPayrollDeductionRepository;
use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Repository\IUserRepository;
use Illuminate\Support\Facades\DB;
use App\Models\Payroll;
use App\Models\User;
use Carbon\Carbon;

class PayrollRepository implements IPayrollRepository{
    
    public function __construct(
        protected IUserRepository $userRepository,
        protected IPayrollDeductionRepository $payrollDeductionRepo,
        protected IContributionTypeRepository $contributionTypeRepo

    ){}

    public function setPayrollModel(array $data):Payroll
    {
        return $payroll = Payroll::create($data);
    }

    public function getPayrollThisMonth()
    {
        
       return Payroll::with(['user', 'previousPayroll'])
                    ->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->get();
    }

    public function getUsersWithoutPayrollForCurrentMonth()
    {
         $startOfMonth = Carbon::now()->startOfMonth();
         $endOfMonth = Carbon::now()->endOfMonth();

        return User::whereDoesntHave('payrolls', function ($query) use ($startOfMonth, $endOfMonth) {
                        $query->whereBetween('created_at', [$startOfMonth, $endOfMonth]);})
                        ->with(['latestPayroll'])
                        ->get();
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
         return  Payroll::join('users', 'payrolls.user_id', '=', 'users.user_id')
                        ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')
            ->select([
                'users.user_id',
                'users.employee_id as employee_id',
                'users.last_name as last_name',
                'users.first_name as first_name',
                'users.designation as designation',
                'users.department as department',
                'users.employment_type as employment_type',
                'users.basic_pay',
                'payrolls.*',
                'payroll_deductions.*'
            ])
            ->whereMonth('payrolls.created_at', $month)
            ->whereYear('payrolls.created_at', $year)
            ->get();

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

}
