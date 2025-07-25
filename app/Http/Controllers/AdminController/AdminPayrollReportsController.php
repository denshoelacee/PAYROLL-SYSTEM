<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IPayrollReportsServices\IGeneratePayrollsReportService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminPayrollReportsController extends Controller
{

    public function __construct(protected IGeneratePayrollsReportService $payrollReportsService){}

    public function payrollReportsYearly(Request $request)
    {
         $year = $request->year ?? now()->year;
        
         $monthlySummary = $this->payrollReportsService->generatePayrollReport($year);
       
       dd($monthlySummary); 
    }

    public function payrollReportsYearlyView($year,$month)
    {
 
         $details = DB::table('payrolls')
        ->join('users', 'payrolls.user_id', '=', 'users.user_id')
        ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')
        ->select([
            'users.user_id',
            DB::raw("CONCAT(users.last_name, ', ',users.first_name) as employee_name"),
            'payrolls.holding_tax',
            'payrolls.rlip',
            'payrolls.basic_salary',
        ])
        ->where('publish_status', 'publish')
        ->whereMonth('payrolls.created_at', $month)
        ->whereYear('payrolls.created_at', $year)
        ->get();

        dd($details);

    $monthName = \Carbon\Carbon::create()->month($month)->format('F');

    }
}
