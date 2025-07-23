<?php

namespace App\Contracts\Services\IPayrollReportsServices;

interface IGeneratePayslipsReportService
{

     public function UserPayrollMonthly($year,$month);

}