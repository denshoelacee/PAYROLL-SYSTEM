<?php

namespace App\Traits;

use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Repository\UserRepositoryInterface;
use Illuminate\Support\Carbon;

trait PayslipIdGenerator
{
    public function generatePayslipId($user_id, $type)
    {

        $user = $this->userRepository->findEmploymeeIdAndEmployementTypeById($user_id);

        $date = now();
        $idPrefix = $this->generateIdPrefix($date, $user->employee_id);

        return match ($type) {
            'Regular'   => ['id' => $idPrefix, 'type' => 'Regular'],
            'Job Order' => $this->handleJobOrder($user_id, $idPrefix),
            'Part-Time' => $this->handlePartTime($user, $idPrefix),
            default     => ['id' => $idPrefix . '00', 'type' => 'Unknown Type'],
        };

    }

    private function generateIdPrefix(Carbon $date, $employeeId)
    {

        $yearMonth = $date->format('Ym');            
        $paddedEmployeeId = str_pad($employeeId, 8, '0', STR_PAD_LEFT);

        return $yearMonth . $paddedEmployeeId;

    }

    private function handleJobOrder($user_id, $idPrefix)
    {

        $exists = $this->payrollRepository->findHasPayrollForJobOrder($user_id);

        $suffix = $exists ? '-02' : '-01';
        return ['id' => $idPrefix . $suffix, 'type' => 'Job Order'];

    }

    private function handlePartTime($user, $idPrefix)
    {

        return match ($user->employment_type) {
            'Regular'    => ['id' => $idPrefix . '-003', 'type' => 'Regular|Part-Time'],
            'Job Order'  => ['id' => $idPrefix . '-002', 'type' => 'Job Order|Part-Time'],
            'Part-Time'  => ['id' => $idPrefix . '-001', 'type' => 'Part-Time'],
            default      => ['id' => $idPrefix . '00', 'type' => 'Unknown Part-Time Type'],
        };
        
    }
}