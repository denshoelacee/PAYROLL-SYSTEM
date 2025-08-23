<?php

namespace App\Traits;

use App\Models\User;
use Carbon\Carbon;
class PayrollIdGenerator
{

   public function generatePayrollId($user_id, bool $duplicate) 
   {

        $employee_id = User::where('user_id', $user_id)->value('employee_id');   
        $year = Carbon::now()->format('Y'); 
        $month = Carbon::now()->format('m'); 

        $payrollId = $year . $month . $employee_id;

        if ($duplicate) {
            $payrollId .= '2';
        }

        return $payrollId;
   }
}