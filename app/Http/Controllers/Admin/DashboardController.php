<?php

namespace App\Http\Controllers\Admin;

use App\Contracts\Services\IDashboardService;
use App\Contracts\Services\Reports\IPayrollReportService;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{  
    public function __construct(
        protected IDashboardService $dashboardService,
        protected IPayrollReportService $payrollReportsService
        
    ){}

    public function dashboard(Request $request){

        $year = $request->year ?? now()->year;

        $yearlyReports = $this->payrollReportsService->generatePayrollReport($year);
        $summaryTotal = $this->dashboardService->getTaxAndUserSummary();
        $departmentGross = $this->dashboardService->latestGrossPayMonthly();
        $contributionBreakdown = $this->dashboardService->contributionBreakdown();
        
        return Inertia::render('Admin/Dashboard',
            [
                'yearlyReports'    => $yearlyReports,
                'selectedYear'     => (string)$year,
                'availableYears'   => range(2024, now()->year),
                'summaryTotal'     => $summaryTotal,
                'departmentGross'  => $departmentGross,
                'contributionBreakdown' => $contributionBreakdown,
            ]);
    }
}
