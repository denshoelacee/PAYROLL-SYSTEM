<?php

namespace App\Contracts\Services\IPayrollReportsServices;

interface GeneratePayrollsReportServiceInterface
{
     public function generatePayrollReport($year, $payslipType);
     public function generatePayrollReportYearlyView($year, $month, $payrollType);
}
