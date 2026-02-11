<?php

namespace App\Repository;

use App\Models\Payroll;
use App\Contracts\Repository\PayrollReportsRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PayrollReportsRepository implements PayrollReportsRepositoryInterface
{

    public function getContributionsBreakdownMonthly()
    {

         return Payroll::selectRaw('
            CAST(COALESCE(SUM(rlip), 0) AS DECIMAL(10,2)) AS gsis,
            CAST(COALESCE(SUM(contributions), 0) AS DECIMAL(10,2)) AS pagibig,
            CAST(COALESCE(SUM(philhealth), 0) AS DECIMAL(10,2)) AS philhealth
           ')
            ->where('publish_status', 'publish')
            ->whereBetween('created_at',
                [
                    now()->startOfMonth(),
                    now()->endOfMonth()
                ])
            ->first();

    }

    public function getLatestGrossPayMonthlyByDepartment()
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
                    COALESCE(housing_loan, 0) + 
                    COALESCE(city_savings_bank, 0) + 
                    COALESCE(fea, 0) + 
                    COALESCE(coop, 0) + 
                    COALESCE(landbank, 0) + 
                    COALESCE(ucpb, 0) + 
                    COALESCE(cfi, 0) + 
                    COALESCE(tipid, 0)
                ), 0) AS totalLoan
            ')
            ->where('publish_status', 'publish')
            ->whereBetween('created_at', [
                now()->startOfMonth(),
                now()->endOfMonth()
            ])
            ->first();
    }

    
    public function getPayrollReportsYearly($year, $payslipTypes)
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
            ->whereIn('payrolls.payslip_type', $payslipTypes)
            ->whereYear('payrolls.created_at', $year)
            ->groupBy(DB::raw('MONTH(payrolls.created_at)'))
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                $item->month_name = Carbon::create()->month($item->month)->format('F');
                $item->total_gross = (float) $item->total_gross;
                $item->total_deduction = (float) $item->total_deduction;
                $item->net_pay = (float) $item->net_pay;

                return $item;
            });

    }

    public function getPayrollReportsYearlyView($year, $month, $payslipType)
    {

        return DB::table('payrolls')
            ->join('users', 'payrolls.user_id', '=', 'users.user_id')
            ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')
            ->select([
                'users.user_id',
                DB::raw("CONCAT(users.last_name, ', ', users.first_name) AS employee_name"),
                // Salary components
                'payrolls.basic_salary', 'payrolls.pera', 'payrolls.daily_rate',
                'payrolls.hourly_rate', 'payrolls.duty_count', 'payrolls.units',
                'payrolls.service_rendered', 'payrolls.absent', 'payrolls.late',
                // Tax and deductions
                'payrolls.holding_tax', 'payrolls.tax_bal_due', 'payrolls.rlip',
                // Loans
                'payrolls.policy_loan', 'payrolls.consol_loan', 'payrolls.emerg_loan',
                'payrolls.gel', 'payrolls.gfal', 'payrolls.mpl', 'payrolls.mpl_lite',
                // Other deductions
                'payrolls.contributions', 'payrolls.loans', 'payrolls.housing_loan',
                'payrolls.philhealth', 'payrolls.cfi', 'payrolls.tipid',
                'payrolls.city_savings_bank', 'payrolls.fea', 'payrolls.canteen',
                'payrolls.disallowance', 'payrolls.unliquidated_ca',
                'payrolls.disallowance_honoraria', 'payrolls.coop',
                'payrolls.landbank', 'payrolls.ucpb',
                // Totals
                'payroll_deductions.total_accrued_period as gross_salary',
                'payroll_deductions.total_deduction', 
                'payroll_deductions.net_pay'
            ])
            ->where('payrolls.publish_status', 'publish')
            ->whereIn('payrolls.payslip_type', $payslipType)
            ->where(DB::raw('YEAR(payrolls.created_at)'), $year)
            ->where(DB::raw('MONTH(payrolls.created_at)'), $month)
            ->orderBy('users.last_name')
            ->orderBy('users.first_name')
            ->get();
    }


 public function getContributionThisMonthById($userId)
    {

        $status = 'publish';
        $type = 'Regular';

        $result = Payroll::select(
            'payroll_id',
            DB::raw('(
                COALESCE(rlip, 0) +
                COALESCE(contributions, 0) +
                COALESCE(philhealth, 0)
            ) AS total_contributions')
        )
        ->where('publish_status', $status)
        ->where('payslip_type', $type)
        ->where('user_id', $userId)
        ->whereBetween('created_at', [
            now()->startOfMonth(),
            now()->endOfMonth()
        ])
        ->latest('created_at')
        ->first();

        // Return default values if no record found
        return $result ?? (object)[
            'payroll_id' => null,
            'total_contributions' => 0
        ];

    }

    public function getLoanAndTaxThisMonthById($userId)
    {

        $status = 'publish'; //publish, partial, none

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
                    COALESCE(housing_loan, 0) + 
                    COALESCE(city_savings_bank, 0) + 
                    COALESCE(fea, 0) + 
                    COALESCE(coop, 0) + 
                    COALESCE(landbank, 0) + 
                    COALESCE(ucpb, 0) + 
                    COALESCE(cfi, 0) + 
                    COALESCE(tipid, 0)
                ), 0) AS loan
             ')
            ->where('user_id', $userId)
            ->where('publish_status', $status)
            ->whereBetween('created_at', [
                now()->startOfMonth(),
                now()->endOfMonth()
               ])
            ->first();

    }

    public function findPayrollReportsYearlyById($year, $id)
    {  

        $status = 'publish'; //publish, partial, none

        return DB::table('payrolls')
            ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')

            ->selectRaw('
                MONTH(payrolls.created_at) as month,
                SUM(payroll_deductions.total_accrued_period) as total_gross,
                SUM(payroll_deductions.total_deduction) as total_deduction,
                SUM(payroll_deductions.net_pay) as net_pay
            ')
            ->where('publish_status', $status)
            ->where('user_id', $id)
            ->whereYear('payrolls.created_at', $year)
            ->groupBy(DB::raw('MONTH(payrolls.created_at)'))
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                $item->month_name = Carbon::create()->month($item->month)->format('F');
                $item->total_gross = (float) $item->total_gross;
                $item->total_deduction = (float) $item->total_deduction;
                $item->net_pay = (float) $item->net_pay;
                return $item;
            });
    }
    
}