<?php

namespace App\Services;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IEmployeeService;
use Illuminate\Pagination\LengthAwarePaginator;

class EmployeeService implements IEmployeeService{

    public function __construct(protected IUserRepository $userRepo){}

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