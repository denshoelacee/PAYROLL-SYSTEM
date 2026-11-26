<?php

namespace App\Services\Reports;

use App\Contracts\Repositories\IPayrollRepository;
use App\Contracts\Services\Reports\IPayrollReportService;

class PayrollReportService implements IPayrollReportService
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

