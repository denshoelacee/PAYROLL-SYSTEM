<?php

namespace App\Http\Controllers\EmployeeController;

use App\Contracts\Services\IEmployeeServices\IPayslipReportsServices;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;



class EmployeeReportsController extends Controller
{
    public function __construct(protected IPayslipReportsServices $payslipReportsServices){}

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