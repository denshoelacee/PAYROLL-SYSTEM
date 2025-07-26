<?php

namespace App\Contracts\Repository;

use App\Models\Payroll;

interface IPayrollRepository{
    
      public function setPayrollModel(array $data):Payroll;

      public function getPayrollThisMonth();

      public function getUsersWithoutPayrollForCurrentMonth();

      public function updatePartial(array $data,$id): void;

      public function updatePublish(array $data,$id): void;

       public function getUserPayrollMonthly($year, $month);

        public function getPayrollReportsYearly($year);

         public function getPayrollReportsYearlyView($year,$month);
      
}