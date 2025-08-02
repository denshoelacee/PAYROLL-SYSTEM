<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IDashboardService;
use App\Contracts\Services\IPayrollReportsServices\IGeneratePayrollsReportService;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{  
    public function __construct(
        protected IDashboardService $dashboardService,
        protected IGeneratePayrollsReportService $payrollReportsService
        
    ){}

    public function dashboard(Request $request){

        $year = $request->year ?? now()->year;

        $userStatsMonthly = $this->dashboardService->getMonthlyUserStatsService();
        $yearlyReports = $this->payrollReportsService->generatePayrollReport($year);
        $summaryTotal = $this->dashboardService->getTaxAndUserSummary();
        $departmentGross = $this->dashboardService->latestGrossPayMonthly();
        
        //dd($departmentGross);
        return Inertia::render('Admin/Dashboard',
            [
                'userStatsMonthly' => $userStatsMonthly,
                'yearlyReports'    => $yearlyReports,
                'selectedYear'     => (string)$year,
                'availableYears'   => range(2024, now()->year),
                'summaryTotal'     => $summaryTotal,
                'departmentGross'  => $departmentGross
            ]);
    }
}
