<?php

namespace App\Services\PayrollReportsServices;

use App\Contracts\Repository\PayrollReportsRepositoryInterface;
use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayrollsReportServiceInterface;
use App\Traits\PayslipTypeMapping;

class GeneratePayrollsReportService implements GeneratePayrollsReportServiceInterface
{

    use PayslipTypeMapping;
    public function __construct(
              protected PayrollRepositoryInterface $payrollRepository,
              protected PayrollReportsRepositoryInterface $payrollReportRepository,
        ){}


    /**
     * Summary of generatePayrollReport
     * @param mixed $year
     * @param mixed $payslipType Accept 'Regular', 'Job Order', 'Part-Time', 'All' 
     */
    public function generatePayrollReport($year, $payslipType)
    {

         $payslipTypes = $this->typeMapping($payslipType);
         
        return $this->payrollReportRepository->getPayrollReportsYearly($year, $payslipTypes);

    }

    public function generatePayrollReportYearlyView($year, $month, $payrollType )
    {

        return $this->payrollReportRepository->getPayrollReportsYearlyView($year, $month, $payrollType);

    }

}

