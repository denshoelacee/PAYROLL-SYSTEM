<?php

namespace App\Services\PayrollReportsServices;

use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayslipsReportServiceInterface;

class GeneratePayslipsReportService implements GeneratePayslipsReportServiceInterface {

    public function __construct(protected PayrollRepositoryInterface $payrollRepository){}

      public function UserPayrollMonthly($year,$month)
    {
       return $this->payrollRepository->getUserPayrollMonthly($year,$month);
    }

}
