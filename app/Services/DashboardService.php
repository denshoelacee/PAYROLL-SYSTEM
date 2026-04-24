<?php

namespace App\Services;

use App\Contracts\Repository\PayrollReportsRepositoryInterface;
use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Repository\UserRepositoryInterface;
use App\Contracts\Services\DashboardServiceInterface;
use App\Traits\GetAuthId;
use App\Traits\PayslipTypeMapping;

class DashboardService 
{

    use PayslipTypeMapping;
    use GetAuthId;

     public function __construct(
                protected UserRepositoryInterface    $userRepository,
                protected PayrollRepositoryInterface $payrollRepository,
                protected PayrollReportsRepositoryInterface $payrollReportRepository,
     ) {}

   public function getTaxAndUserSummary()
   {

        $totalUsers = $this->userRepository->countUser();
        $taxSummary = $this->payrollReportRepository->geTotalTaxThisMonth();

        return [
            'total_users' => $totalUsers,
            'tax' => $taxSummary->tax ?? 0,
            'due_tax' => $taxSummary->due_tax ?? 0,
            'total_loan' => $taxSummary->totalLoan ?? 0,
        ];
        
   }

   public function latestGrossPayMonthly()
   {

        return $this->payrollReportRepository->getLatestGrossPayMonthlyByDepartment();

   }

   public function contributionBreakdown()
   {

       return $this->payrollReportRepository->getContributionsBreakdownMonthly();

   }

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
        if($user && $user->employment_type === 'Regular'){

           return $this->payrollReportRepository->getContributionThisMonthById($userId);

        }
        
        return null;

    }

    public function generateLoanAndTaxThisMonthById()
    {

        $userId = $this->getAuthUserId();

        return $this->payrollReportRepository->getLoanAndTaxThisMonthById($userId);

    }

}
