<?php

namespace App\Traits;

use App\Contracts\Repository\UserRepositoryInterface;


trait JobWorkPayrollAssigned
{
   
    public function __construct(protected UserRepositoryInterface $userRepository){}

    public function jobWorkAssigned($id, $type, $designation, $department)
    {
        
        $user = $this->userRepository->findRoleDetailsById($id);

        if($user && $type === $user->employment_type)
        {

            return [
                'designation' => $user->designation,
                'department' => $user->department
            ];
            
        }

 
        return [
            'designation' => $designation,
            'department' => $department
        ];

    }
}