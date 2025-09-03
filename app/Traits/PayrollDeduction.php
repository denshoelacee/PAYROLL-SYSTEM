<?php

namespace App\Traits;

use App\Contracts\Repository\ContributionTypeRepositoryInterface;
use App\Repository\ContributionTypeRepository;

trait PayrollDeduction
{
    
    public function __construct(protected ContributionTypeRepositoryInterface $contributionTypeRepository){}
    
    public function calculateTotalDeduction(array $data, float $totalContribution):float
    {
         $deductionFields = [
            'absent',
            'late',
            'holding_tax',
            'tax_bal_due',
            'policy_loan',
            'consol_loan',
            'emerg_loan',
            'gel',
            'gfal',
            'mpl',
            'mpl_lite',
            'contributions',
            'loans',
            'housing_loan',
            'cfi',
            'tipid',
            'city_savings_bank',
            'fea',
            'canteen',
            'disallowance',
            'unliquidated_ca',
            'disallowance_honoraria',
            'coop',
            'landbank',
            'ucpb',
            'sss',
            'deduction1',
            'deduction2',
            'deduction3',
        ];

        $total = 0;

        foreach ($deductionFields as $field) {
            $value = isset($data[$field]) ? floatval($data[$field]) : 0;
            $total += $value;
        }

        $total += $totalContribution;

        return round($total, 2);
    }


    public function calculateDailyWork($daily_rate, $duty_count )
    {
          return $daily_rate * $duty_count;
    }


    public function calculateHourlyWork($hourly_rate, $service_rendered)
    {
          return $hourly_rate * $service_rendered;
    }


    public function rlipDeduction($salary)
    {
        $contribution = $this->contributionTypeRepository->getContribution();

        if (!$contribution || !isset($contribution->rlip)) {
            return 0;
        }

        return $salary * $contribution->rlip / 100;
    }

    public function philDeduction($salary)
    {
        $minSalary = 10000.00;
        $maxSalary = 100000.00;

        $contribution = $this->contributionTypeRepository->getContribution();


        if (!$contribution || !isset($contribution->philhealth)) {
            return 0;
        }
    
        $rate = $contribution->philhealth / 100;

        if ($salary <= $minSalary) {
            return 250.00;
        } elseif ($salary > $minSalary && $salary <= $maxSalary) {
            return $salary * $rate;
        } else {
            return $maxSalary * $rate;
        }
    }

    
}   