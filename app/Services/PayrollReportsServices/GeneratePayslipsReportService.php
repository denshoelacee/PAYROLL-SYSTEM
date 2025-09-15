<?php

namespace App\Services\PayrollReportsServices;

use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayslipsReportServiceInterface;

class GeneratePayslipsReportService implements GeneratePayslipsReportServiceInterface {

   public function __construct(protected PayrollRepositoryInterface $payrollRepository){}

   public function UserPayrollMonthly($year,$month)
   {

      return $this->payrollRepository->getUserPayrollMonthly($year,$month);

   }

   public function viewPayslipByPayrollId($payslip_id)
   {

      $user = auth()->user();
        $payroll = $this->payrollRepository->getViewPayslipByPayslipId($payslip_id);

         if (!$payroll) {
            abort(404);
         }

         if ($user->role !== 'Admin' && $payroll['user_id'] !== $user->user_id){
            abort(403);
         }

         return $payroll;
   }

}
