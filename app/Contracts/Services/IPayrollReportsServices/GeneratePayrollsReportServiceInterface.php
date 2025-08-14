<?php

namespace App\Contracts\Services\IPayrollReportsServices;

interface GeneratePayrollsReportServiceInterface
{
     public function generatePayrollReport($year);
     public function generatePayrollReportYearlyView($year,$month);
}
