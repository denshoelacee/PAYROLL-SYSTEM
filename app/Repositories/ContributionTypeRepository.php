<?php

namespace App\Repositories;

use App\Contracts\Repositories\IContributionTypeRepository;
use App\Models\ContributionType;

class ContributionTypeRepository implements IContributionTypeRepository
{
    public function getContribution()
    {
        return ContributionType::first();
    }
}
