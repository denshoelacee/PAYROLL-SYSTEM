<?php

namespace App\Traits;

use App\Contracts\Repository\ContributionTypeRepositoryInterface;

trait PayrollContributionDeduction
{

    public function __construct(protected ContributionTypeRepositoryInterface $contributionTypeRepository){}

    public function calculateContributionDeduction($salary,$employment_type)
    {

        if($employment_type !== 'Regular')
        {

            return [
            'rlip' => 0,
            'philhealth' => 0,
            'totalContribution' => 0
             ];
        }
    
        $rlip = $this->rlipDeduction($salary);
        $philhealth = $this->philDeduction($salary);
        
        return [
            'rlip' => $rlip,
            'philhealth' => $philhealth,
            'totalContribution' => $rlip + $philhealth
        ];

    }

    public function rlipDeduction($salary)
    {

        $contribution = $this->contributionTypeRepository->getContribution();

        if (!$contribution || !isset($contribution->rlip)){
            return 0;
        }

        return $salary * $contribution->rlip / 100;

    }

    public function philDeduction($salary)
    {

        $minSalary = 10000.00;
        $maxSalary = 100000.00;

        $contribution = $this->contributionTypeRepository->getContribution();


        if (!$contribution || !isset($contribution->philhealth)){
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