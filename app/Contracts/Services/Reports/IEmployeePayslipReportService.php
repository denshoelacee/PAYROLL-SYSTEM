<?php

namespace App\Contracts\Services\Reports;

interface IEmployeePayslipReportService
{
    public function fetchSortedPayslipsByUser($year);
}