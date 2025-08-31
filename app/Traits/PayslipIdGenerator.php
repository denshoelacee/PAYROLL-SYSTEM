<?php

namespace App\Traits;

use App\Models\User;
use App\Models\Payroll;
use Illuminate\Support\Carbon;

trait PayslipIdGenerator
{
    public function generatePayslipId($user_id, $type )
    {
        $user = User::select('employee_id', 'employment_type')
                    ->where('user_id', $user_id)
                    ->firstOrFail();

        $date = now();
        $idPrefix = $this->generateIdPrefix($date, $user->employee_id);

        return match ($type) {
            'Regular'   => [$idPrefix, 'Regular'],
            'Job Order' => $this->handleJobOrder($user_id, $idPrefix),
            'Part-Time' => $this->handlePartTime($user, $idPrefix),
            default     => [$idPrefix . '00', 'Unknown Type'],
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
        $date = now();
        $exists = Payroll::where('user_id', $user_id)
                         ->whereBetween('created_at', [
                             $date->copy()->startOfMonth(),
                             $date->copy()->endOfMonth()
                         ])
                         ->exists();

        $suffix = $exists ? '02' : '01';
        return [$idPrefix . $suffix, 'Job-Order'];
    }

    private function handlePartTime($user, $idPrefix)
    {
        return match ($user->employment_type) {
            'Regular'    => [$idPrefix . '-2', 'Regular/Part-Time'],
            'Job Order'  => [$idPrefix . '-2', 'Job Order/Part-Time'],
            'Part-Time'  => [$idPrefix . '01', 'Part-Time'],
            default      => [$idPrefix . '00', 'Unknown Part-Time Type'],
        };
    }
}
