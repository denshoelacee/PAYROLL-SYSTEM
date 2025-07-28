<?php

namespace App\Http\Controllers\EmployeeController;

use App\Contracts\Services\IEmployeeServices\IPayslipReportsServices;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmployeeReportsController extends Controller
{
    public function __construct(protected IPayslipReportsServices $payslipReportsServices){}

    public function userPayslipReports(Request $request)
    {
        $year = $request->year ?? now()->year;

        $sortedPayslip = $this->payslipReportsServices->fetchSortedPayslipsByUser($year);

    }
}