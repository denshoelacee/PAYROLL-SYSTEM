<?php

namespace App\Contracts\Repository;

interface PayrollReportsRepositoryInterface
{

    public function getContributionsBreakdownMonthly();

    public function getLatestGrossPayMonthlyByDepartment();

    public function geTotalTaxThisMonth();

    public function getPayrollReportsYearly($year, $payslipType);

    public function getPayrollReportsYearlyView($year, $month, $payrollType);
}