<?php

namespace App\Contracts\Services;

interface PayrollServiceInterface
{
    public function updatePayslipById(string $payslip_id,string $type);

    public function usersWithoutPayrollForCurrentMonth($id,$type);
    
    public function selectEmploymentSalaryType($employmentType);
    
    public function storePartial(array $data);

    public function publish(array $data):void;

    public function editedPartialPublishPayroll(array $data,$id):void;

}
