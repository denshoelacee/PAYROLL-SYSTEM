<?php

namespace App\Repository;

use App\Contracts\Repository\IContributionTypeRepository;
use App\Models\ContributionType;

class ContributionTypeRepository implements IContributionTypeRepository
{

    public function getContribution()
    {
        return ContributionType::first();
    }

    public function rlipDeduction($salary)
    {
        $contribution = $this->getContribution()->rlip;

        $rlipDeduc = $salary * $contribution / 100;

        return $rlipDeduc;
    }

    public function philDeduction($salary)
    {
       $contribution = $this->getContribution()->philhealth;

       $philDeduc = $salary * $contribution / 100;
        
       return $philDeduc /2;

    }
}