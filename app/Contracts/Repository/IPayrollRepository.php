<?php

namespace App\Contracts\Repository;

use App\Models\Payroll;

interface IPayrollRepository{
    
      public function getTotalNetpayMonth();

      public function getPayrollModel(array $data):Payroll;
}