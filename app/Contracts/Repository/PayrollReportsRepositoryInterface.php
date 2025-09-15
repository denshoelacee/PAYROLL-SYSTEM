<?php

namespace App\Contracts\Repository;

interface PayrollReportsRepositoryInterface
{

    public function getContributionsBreakdownMonthly();

    public function getLatestGrossPayMonthlyByDepartment();

    public function geTotalTaxThisMonth();

    public function getPayrollReportsYearly($year, $payslipTypes);

    public function getPayrollReportsYearlyView($year, $month, $payslipType);

    public function findPayrollReportsYearlyById($year, $id);

    public function getContributionThisMonthById($userId);

    public function getLoanAndTaxThisMonthById($userId);
}