<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IPayrollReportsServices\IGeneratePayrollsReportService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AdminPayrollReportsController extends Controller
{

    public function __construct(protected IGeneratePayrollsReportService $payrollReportsService){}

    public function payrollReportsYearly(Request $request)
    {
        $year = $request->year ?? now()->year;
                    
        $monthlySummary = $this->payrollReportsService->generatePayrollReport($year);

        return Inertia::render('Admin/Reports',
        [
            'selectedYear' => (string)$year,
            'monthlySummary' => $monthlySummary,
            'availableYears' => range(2025, now()->year),
        ]);
       
    }

    public function payrollReportsYearlyView($year,$month)
    {
 
        $details = $this->payrollReportsService->generatePayrollReportYearlyView($year,$month);

        $monthName = \Carbon\Carbon::create()->month($month)->format('F');

        return Inertia::render('Admin/ViewReport',
        [
            'viewReport' => $details,
            'headerYearTitle' =>  $year,
            'headerMonthTitle' => $monthName
        ]);

    }
}
