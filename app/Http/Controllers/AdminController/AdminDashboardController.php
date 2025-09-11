<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\DashboardServiceInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayrollsReportServiceInterface;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function __construct(
        protected DashboardServiceInterface              $dashboardService,
        protected GeneratePayrollsReportServiceInterface $payrollReportsService

    ){}

    public function dashboard(Request $request){

        $year = $request->year ?? now()->year;


        $yearlyReports         = $this->payrollReportsService->generatePayrollReport($year, 'All');
        $summaryTotal          = $this->dashboardService->getTaxAndUserSummary();
        $departmentGross       = $this->dashboardService->latestGrossPayMonthly();
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
