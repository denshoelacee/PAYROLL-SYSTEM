<?php

namespace App\Services\PayrollReportsServices;

use App\Contracts\Repository\PayrollReportsRepositoryInterface;
use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Repository\UserRepositoryInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayrollsReportServiceInterface;
use App\Traits\GetAuthId;
use App\Traits\PayslipTypeMapping;

class GeneratePayrollsReportService
{

    use PayslipTypeMapping;
    use GetAuthId;

    public function __construct(
              protected PayrollRepositoryInterface $payrollRepository,
              protected PayrollReportsRepositoryInterface $payrollReportRepository,
              protected UserRepositoryInterface $userRepository,
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
        $payrollMapping = $this->typeMapping($payrollType);
       
        return $this->payrollReportRepository->getPayrollReportsYearlyView($year, $month, $payrollMapping);

    }

    public function generatedPayrollReportsYearlyById($year)
    {
        
        $userId = $this->getAuthUserId();

        return $this->payrollReportRepository->findPayrollReportsYearlyById($year, $userId);

    }

    public function generateContributionThisMonthById()
    {

        $userId = $this->getAuthUserId();

        $user = $this->userRepository->findById($userId);
        //if($user && $user->employment_type === 'Regular'){

           return $this->payrollReportRepository->getContributionThisMonthById($userId);

        
        
        //return null;

    }

    public function generateLoanAndTaxThisMonthById()
    {

        $userId = $this->getAuthUserId();

        return $this->payrollReportRepository->getLoanAndTaxThisMonthById($userId);

    }

    


    

}

