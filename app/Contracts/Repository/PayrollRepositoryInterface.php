<?php

namespace App\Contracts\Repository;

use App\Models\Payroll;

interface PayrollRepositoryInterface{

      public function setPayrollModel(array $data):Payroll;

      public function getSelectEmploymentSalaryType($employmentType);

    //  public function getPayrollThisMonth();

      public function getUsersWithoutPayrollForCurrentMonth($id);

      public function getViewPayslipByPayslipId($payslip_id);

      public function updatePartial(array $data,$id): void;

      public function updatePublish(array $data,$id): void;

      public function getUserPayrollMonthly($year, $month);

      public function getPayrollReportsYearly($year);

      public function geTotalTaxThisMonth();

      public function getLatestGrossPayMonthly();

      public function getContributionsBreakdownMonthly();


      public function getPayrollReportsYearlyView($year,$month);

      //Employee SQL Request
      public function getEmployeePayslipReports($id, $year);

}
