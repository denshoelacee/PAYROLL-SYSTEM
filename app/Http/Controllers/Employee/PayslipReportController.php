<?php

namespace App\Http\Controllers\Employee;

use App\Contracts\Services\Reports\IEmployeePayslipReportService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;



class PayslipReportController extends Controller
{
    public function __construct(protected IEmployeePayslipReportService $payslipReportsServices){}

    public function userPayslipReports(Request $request)
    {
        $year = $request->year ?? now()->year;

        $sortedPayslip = $this->payslipReportsServices->fetchSortedPayslipsByUser($year);

        return Inertia::render('Employee/Payroll',[
            'availableYears' => range(2023, now()->year),
            'selectedYear' => (string)$year,
            'userPayslip' => $sortedPayslip
        ]);

    }
}