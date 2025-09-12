<?php

namespace App\Http\Controllers\EmployeeController;

use App\Contracts\Services\IEmployeeServices\PayslipReportsServicesInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;



class EmployeeReportsController extends Controller
{
    public function __construct(protected PayslipReportsServicesInterface $payslipReportsServices){}

    public function userPayslipReports(Request $request)
    {
        $year = $request->year ?? now()->year;

        $sortedPayslip = $this->payslipReportsServices->fetchSortedPayslipsByUser($year);

        return Inertia::render('Employee/Payroll',[
            'availableYears' => range(2025, now()->year),
            'selectedYear' => (string)$year,
            'userPayslip' => $sortedPayslip
        ]);

    }
}
