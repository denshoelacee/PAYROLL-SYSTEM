<?php

namespace App\Services;

use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Repository\UserRepositoryInterface;
use App\Contracts\Services\DashboardServiceInterface;

class DashboardService implements DashboardServiceInterface{

     public function __construct(
                protected UserRepositoryInterface    $userRepository,
                protected PayrollRepositoryInterface $payrollRepository
     ) {}

   public function getTaxAndUserSummary()
   {
        $totalUsers = $this->userRepository->countUser();
        $taxSummary = $this->payrollRepository->geTotalTaxThisMonth();

        return [
            'total_users' => $totalUsers,
            'tax' => $taxSummary->tax ?? 0,
            'due_tax' => $taxSummary->due_tax ?? 0,
            'total_loan' => $taxSummary->totalLoan ?? 0,
        ];
   }

   public function latestGrossPayMonthly()
   {
        return $this->payrollRepository->getLatestGrossPayMonthly();
   }

   public function contributionBreakdown()
   {
       return $this->payrollRepository->getContributionsBreakdownMonthly();
   }
}
