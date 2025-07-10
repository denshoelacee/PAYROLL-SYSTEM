<?php

namespace App\Contracts\Repository;

use App\Models\Payroll;

interface IPayrollRepository{
    
      public function getTotalNetpayMonth();

      public function setPayrollModel(array $data):Payroll;

      public function getPayrollThisMonth();
}