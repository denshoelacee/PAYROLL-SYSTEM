<?php

namespace App\Services\PayrollReportsServices;

use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Services\IPayrollReportsServices\IGeneratePayrollsReportService;

class GeneratePayrollsReportService implements IGeneratePayrollsReportService
{

    public function __construct(protected IPayrollRepository $payrollRepository){}


    public function generatePayrollReport($year)
    {
        return $this->payrollRepository->getPayrollReportsYearly($year);
    }

    public function generatePayrollReportYearlyView($year,$month)
    {
        return $this->payrollRepository->getPayrollReportsYearlyView($year,$month);
    }
}

