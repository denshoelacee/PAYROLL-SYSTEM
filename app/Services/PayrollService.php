<?php

namespace App\Services;

use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Services\IPayrollService;

class PayrollService implements IPayrollService
{

    public function __construct(protected IPayrollRepository $payrollRepo){}

    public function payrollThisMonth()
    {
        return $this->payrollRepo->getPayrollThisMonth();
    }

    public function usersWithoutPayrollForCurrentMonth()
    {
        return $this->payrollRepo->getUsersWithoutPayrollForCurrentMonth();
    }


}