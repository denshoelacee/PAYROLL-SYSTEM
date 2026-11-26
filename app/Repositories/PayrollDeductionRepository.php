<?php

namespace App\Repositories;

use App\Contracts\Repositories\IPayrollDeductionRepository;
use App\Models\PayrollDeduction;

class PayrollDeductionRepository implements IPayrollDeductionRepository
{
    public function create(array $data): PayrollDeduction
    {
        return PayrollDeduction::create($data);
    }
}
