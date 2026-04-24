<?php

namespace App\Http\Controllers\AdminController;

use App\Services\PayrollReportsServices\GeneratePayrollsReportService;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;



class AdminPayrollReportsController extends Controller
{

    public function __construct(
         protected GeneratePayrollsReportService $payrollReportsService,

    ){}

    public function payrollReportsYearly(Request $request)
    {

        $year = $request->year ?? now()->year;

        $payslipType = $request->payrollType ?? 'Regular';

        $monthlySummary = $this->payrollReportsService->generatePayrollReport($year, $payslipType);

        return Inertia::render('Admin/Reports',
        [
            'selectedYear'   => (string)$year,
            'monthlySummary' => $monthlySummary,
            'availableYears' => range(2025, now()->year),
        ]);

    }

    public function payrollReportsYearlyView(Request $request, $year, $month)
    {
        $payslipType = $request->payrollType ?? 'Regular'; 
        $details = $this->payrollReportsService->generatePayrollReportYearlyView($year,$month, $payslipType);

        $monthName = Carbon::create()->month($month)->format('F');

        return Inertia::render('Admin/ViewReport',
        [
            'viewReport'       => $details,
            'headerYearTitle'  => $year,
            'headerMonthTitle' => $monthName,
            'activePayrollType'=> $payslipType,
        ]);
    }
}
