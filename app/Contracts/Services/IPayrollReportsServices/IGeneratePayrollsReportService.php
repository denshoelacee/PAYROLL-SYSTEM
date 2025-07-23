<?php

namespace App\Contracts\Services\IPayrollReportsServices;

interface IGeneratePayrollsReportService
{
     public function generatePayrollReport($year);
}