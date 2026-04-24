<?php

namespace App\Http\Controllers\AdminController;

use App\Services\DashboardService;
use App\Traits\YearRange;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    use YearRange;

    public function __construct(
        protected DashboardService  $dashboardService,
    ){}

    public function dashboard(Request $request){

        $year = $request->year ?? now()->year;

        $availableYears = $this->yearRange();
        
        $yearlyReports         = $this->dashboardService->generatePayrollReport($year, 'All');
        $summaryTotal          = $this->dashboardService->getTaxAndUserSummary();
        $departmentGross       = $this->dashboardService->latestGrossPayMonthly();
        $contributionBreakdown = $this->dashboardService->contributionBreakdown();

        return Inertia::render('Admin/Dashboard',
            [
                'yearlyReports'    => $yearlyReports,
                'selectedYear'     => (string)$year,
                'availableYears'   => $availableYears,
                'summaryTotal'     => $summaryTotal,
                'departmentGross'  => $departmentGross,
                'contributionBreakdown' => $contributionBreakdown,
            ]);
    }
}
