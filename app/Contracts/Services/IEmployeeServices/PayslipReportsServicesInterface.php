<?php

namespace App\Contracts\Services\IEmployeeServices;

interface PayslipReportsServicesInterface
{
    public function fetchSortedPayslipsByUser($year);
}
