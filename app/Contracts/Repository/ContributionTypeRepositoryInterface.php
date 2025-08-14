<?php

namespace App\Contracts\Repository;

interface ContributionTypeRepositoryInterface
{
       public function getContribution();

       public function rlipDeduction($salary);

       public function philDeduction($salary);
}
