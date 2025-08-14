<?php

namespace App\Services\EmployeeServices;

use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Services\IEmployeeServices\PayslipReportsServicesInterface;
use Illuminate\Support\Facades\Auth;

class PayslipReportsService implements PayslipReportsServicesInterface
{

    public function __construct(protected PayrollRepositoryInterface $payrollRepository){}

    public function fetchSortedPayslipsByUser($year)
    {
         $id = Auth::id();

         return $this->payrollRepository->getEmployeePayslipReports($id,$year);
    }
}
