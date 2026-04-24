<?php

namespace App\Http\Controllers\EmployeeController;

use App\Services\EmployeeServices\PayslipReportsService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;



class EmployeeReportsController extends Controller
{
    public function __construct(
         protected PayslipReportsService $payslipReportsService,
         
    ){}

    public function userPayslipReports(Request $request)
    {
        $year = $request->year ?? now()->year;

        $sortedPayslip = $this->payslipReportsService->fetchSortedPayslipsByUser($year);

        return Inertia::render('Employee/Payroll',[
            'availableYears' => range(2025, now()->year),
            'selectedYear' => (string)$year,
            'userPayslip' => $sortedPayslip
        ]);

    }
}
