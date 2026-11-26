<?php

namespace App\Contracts\Repositories;

use App\Models\PayrollDeduction;

interface IPayrollDeductionRepository
{
    public function create(array $data): PayrollDeduction;
}
