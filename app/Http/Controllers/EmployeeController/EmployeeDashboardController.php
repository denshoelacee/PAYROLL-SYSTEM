<?php

namespace App\Http\Controllers\EmployeeController;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayrollsReportServiceInterface;

class EmployeeDashboardController extends Controller
{

    public function __construct(
         protected GeneratePayrollsReportServiceInterface $payrollReportsService
    ){}
    public function dashboard(Request $request){

        $year = $request->year ?? now()->year;

         $payslipType = 'All';

        $yearlyReports  = $this->payrollReportsService->generatePayrollReport($year, $payslipType);
        
        return Inertia::render('Employee/Dashboard');
    }
}
