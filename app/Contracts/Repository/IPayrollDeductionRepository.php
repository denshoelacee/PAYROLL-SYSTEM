<?php

namespace App\Contracts\Repository;

use App\Models\PayrollDeduction;

interface IPayrollDeductionRepository
{
     public function create(array $data): PayrollDeduction;

     public function calculateTotalAccruedPeriod(array $data):float;

     public function calculateTotalDeduction(array $data,float $totalContribution):float;

}