<?php

namespace App\Contracts\Services;

interface IPayrollService
{
    public function payrollThisMonth();

    public function usersWithoutPayrollForCurrentMonth();
    public function storePartial(array $data);

    public function publish(array $data):void;
}