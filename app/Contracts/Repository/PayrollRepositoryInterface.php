<?php

namespace App\Contracts\Repository;

use App\Models\Payroll;

interface PayrollRepositoryInterface{

      public function findHasPayrollForJobOrder($id);

      public function payrollModel(int $id): ?Payroll;

      public function setPayrollModel(array $data):Payroll;

      public function getSelectEmploymentSalaryType($employmentType);

    //  public function getPayrollThisMonth();

      public function getUsersWithoutPayrollForCurrentMonth($id,$selectedType);

      // Fetch the selected payroll to Update
      public function getUpdatePayslipById(string $payroll_id,string $type);

      public function getViewPayslipByPayslipId($payslip_id);

      public function updatePartial(array $data,$id): void;

      public function updatePublish(array $data,$id): void;

      public function getUserPayrollMonthly($year, $month);

      //Employee SQL Request
      public function getEmployeePayslipReports($id, $year);

}
