<?php

namespace App\Contracts\Repository;

interface IContributionTypeRepository
{
       public function getContribution();

       public function rlipDeduction($salary);

       public function philDeduction($salary);
}