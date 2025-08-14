<?php

namespace App\Contracts\Services\IPayrollReportsServices;

interface GeneratePayslipsReportServiceInterface
{

     public function UserPayrollMonthly($year,$month);

}
