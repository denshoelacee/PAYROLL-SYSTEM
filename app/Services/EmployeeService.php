<?php

namespace App\Services;

use App\Contracts\Repository\UserRepositoryInterface;
use App\Contracts\Services\EmployeeServiceInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class EmployeeService implements EmployeeServiceInterface{

    public function __construct(protected UserRepositoryInterface $userRepo){}

    public function approveAccount($id)
    {
       try
       {
         $verified = $this->userRepo->setApproveAccount($id);
         if($verified){
            return[
                'success' => true,
                'message' => 'Account Approved successfully'
            ];
         }
       }
       catch(\Exception $e)
       {
          return[
            'success' => false,
            'message' => 'Something Wrong'. $e->getMessage()
          ];
       }
    }

    public function rejectAccount($id)
    {
        try
        {
            $reject = $this->userRepo->setRejectAccount($id);
            if($reject){
                return [
                    'success' =>true,
                    'message' => 'Account rejected successfully.'
                ];
            }

        }
        catch(\Exception $e)
        {
            return [
                'success' => false,
                'message' => 'Something Wrong' . $e->getMessage(),
            ];
        }
    }

    public function pendingUsers()
    {
        return $this->userRepo->getPendingUsers();
    }

    public function employeeList()
    {
        return $this->userRepo->getEmployeeList();
    }
}
