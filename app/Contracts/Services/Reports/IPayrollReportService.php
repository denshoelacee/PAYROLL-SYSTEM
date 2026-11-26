<?php

namespace App\Contracts\Services\Reports;

interface IPayrollReportService
{
     public function generatePayrollReport($year);
     public function generatePayrollReportYearlyView($year,$month);
}