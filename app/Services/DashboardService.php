<?php

namespace App\Services;

use App\Contracts\Repositories\IPayrollRepository;
use Carbon\Carbon;
use App\Contracts\Repositories\IUserRepository;
use App\Contracts\Services\IDashboardService;

class DashboardService implements IDashboardService{

     public function __construct(
                protected IUserRepository $userRepository,
                protected IPayrollRepository $payrollRepository
     ) {}
     
   public function getTaxAndUserSummary()
   {
        $totalUsers = $this->userRepository->countUser();
        $taxSummary = $this->payrollRepository->getTotalTaxThisMonth();

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