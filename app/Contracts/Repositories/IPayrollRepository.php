<?php

namespace App\Contracts\Repositories;

use App\Models\Payroll;

interface IPayrollRepository{
    
      public function setPayrollModel(array $data):Payroll;

      public function getPayrollThisMonth();

      public function getUsersWithoutPayrollForCurrentMonth();

      public function updatePartial(array $data,$id): void;

      public function updatePublish($id, array $payrollData, array $deductionData): void;

      public function getUserPayrollMonthly($year, $month);

      public function getPayrollReportsYearly($year);

      public function getTotalTaxThisMonth();

      public function getLatestGrossPayMonthly();

      public function getContributionsBreakdownMonthly();
      
      
      public function getPayrollReportsYearlyView($year,$month);

      //Employee SQL Request
      public function getEmployeePayslipReports($id, $year);
      
}