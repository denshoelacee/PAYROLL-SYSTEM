<?php

namespace App\Contracts\Services;

interface PayrollServiceInterface
{
    public function payrollThisMonth();

    public function usersWithoutPayrollForCurrentMonth();
    public function storePartial(array $data);

    public function publish(array $data):void;

    public function editedPartialPublishPayroll(array $data,$id):void;

}
