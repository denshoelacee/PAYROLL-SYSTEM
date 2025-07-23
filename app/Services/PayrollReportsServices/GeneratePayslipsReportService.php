<?php

namespace App\Services\PayrollReportsServices;

use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Services\IPayrollReportsServices\IGeneratePayslipsReportService;

class GeneratePayslipsReportService implements IGeneratePayslipsReportService {
    
    public function __construct(protected IPayrollRepository $payrollRepository){}
    
      public function UserPayrollMonthly($year,$month)
    {
       return $this->payrollRepository->getUserPayrollMonthly($year,$month);
    }

}