<?php

namespace App\Services\PayrollReportsServices;

use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayrollsReportServiceInterface;

class GeneratePayrollsReportService implements GeneratePayrollsReportServiceInterface
{

    public function __construct(protected PayrollRepositoryInterface $payrollRepository){}


    public function generatePayrollReport($year)
    {
        return $this->payrollRepository->getPayrollReportsYearly($year);
    }

    public function generatePayrollReportYearlyView($year,$month)
    {
        return $this->payrollRepository->getPayrollReportsYearlyView($year,$month);
    }
}

