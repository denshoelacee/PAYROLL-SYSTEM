<?php

namespace App\Contracts\Services\IPayrollReportsServices;

interface GeneratePayslipsReportServiceInterface
{

     public function UserPayrollMonthly($year,$month);

      public function viewPayslipByPayrollId($payslip_id);

}
