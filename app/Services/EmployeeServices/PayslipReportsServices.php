<?php

namespace App\Services\EmployeeServices;

use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Services\IEmployeeServices\IPayslipReportsServices;
use Illuminate\Support\Facades\Auth;

class PayslipReportsServices implements IPayslipReportsServices
{

    public function __construct(protected IPayrollRepository $pyarollReposiotry){}

    public function fetchSortedPayslipsByUser($year)
    {
         $id = Auth::id();

         return $this->pyarollReposiotry->getEmployeePayslipReports($id,$year);
    }
}