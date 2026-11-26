<?php

namespace App\Services\Reports;

use App\Contracts\Repositories\IPayrollRepository;
use App\Contracts\Services\Reports\IEmployeePayslipReportService;
use Illuminate\Support\Facades\Auth;

class EmployeePayslipReportService implements IEmployeePayslipReportService
{

    public function __construct(protected IPayrollRepository $payrollRepository){}

    public function fetchSortedPayslipsByUser($year)
    {
         $id = Auth::id();

         return $this->payrollRepository->getEmployeePayslipReports($id,$year);
    }
}