<?php

namespace App\Repository;

use App\Contracts\Repository\ContributionTypeRepositoryInterface;
use App\Models\ContributionType;

class ContributionTypeRepository implements ContributionTypeRepositoryInterface
{


    public function getContribution()
    {
        return ContributionType::first();
    }

    public function rlipDeduction($salary)
    {
        $contribution = $this->getContribution();

        if (!$contribution || !isset($contribution->rlip)) {
            return 0;
        }

        return $salary * $contribution->rlip / 100;
    }

    public function philDeduction($salary)
    {
    $minSalary = 10000.00;
    $maxSalary = 100000.00;

    $contribution = $this->getContribution();


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
