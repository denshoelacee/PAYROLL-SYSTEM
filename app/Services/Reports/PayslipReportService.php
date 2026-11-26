<?php

namespace App\Services\Reports;

use App\Contracts\Repositories\IPayrollRepository;
use App\Contracts\Services\Reports\IPayslipReportService;

class PayslipReportService implements IPayslipReportService {
    
    public function __construct(protected IPayrollRepository $payrollRepository){}
    
      public function UserPayrollMonthly($year,$month)
    {
       return $this->payrollRepository->getUserPayrollMonthly($year,$month);
    }

}