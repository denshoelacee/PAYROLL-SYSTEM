<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

trait JobWorkPayrollAssigned
{
    /**
     * Get job work assignment based on user employment type
     *
     * @param int $id User ID
     * @param string $type Employment type
     * @param string $designation Fallback designation
     * @param string $department Fallback department
     * @return array [designation, department]
     * @throws ModelNotFoundException
     */
    public function jobWorkAssigned($id, $type, $designation, $department)
    {
        $user = User::select('designation', 'department', 'employment_type')
                    ->where('user_id', $id)
                    ->first();

        return ($user && $type === $user->employment_type) 
            ? [$user->designation, $user->department]
            : [$designation, $department];
    }
}