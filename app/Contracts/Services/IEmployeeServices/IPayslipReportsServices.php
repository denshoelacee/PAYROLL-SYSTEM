<?php

namespace App\Contracts\Services\IEmployeeServices;

interface IPayslipReportsServices
{
    public function fetchSortedPayslipsByUser($year);
}