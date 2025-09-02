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
    public function jobWorkAssigned(int $id, string $type, string $designation = null, string $department = null): array
    {
        // Define employment types that use database values
        $useDbValues = ['Regular', 'Job Order'];
        
        try {
            $user = User::select('designation', 'department', 'employment_type')
                ->where('user_id', $id)
                ->where('employment_type', $type)
                ->firstOrFail();

            // Use database values for Regular and Job Order employees
            if (in_array($user->employment_type, $useDbValues, true)) {
                return [$user->designation, $user->department];
            }
            
            // Use provided fallback values for other employment types
            return [$designation, $department];
            
        } catch (ModelNotFoundException $e) {
            // Handle case where user is not found
            throw new ModelNotFoundException("User with ID {$id} and employment type '{$type}' not found.");
        }
    }
}