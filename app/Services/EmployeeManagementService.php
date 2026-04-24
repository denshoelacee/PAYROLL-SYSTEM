<?php

namespace App\Services;

use App\Contracts\Repository\UserRepositoryInterface;

class EmployeeManagementService
{

    public function __construct(protected UserRepositoryInterface $userRepository){}

    public function approveAccount($id)
    {
       try
       {
         $verified = $this->userRepository->setApproveAccount($id);
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
            $reject = $this->userRepository->setRejectAccount($id);
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
        return $this->userRepository->getPendingUsers();
    }

    public function employeeList()
    {
        return $this->userRepository->getEmployeeList();
    }

     public function handleApproveRejectBatch(array $user_ids, string $checker)
    {
       return $this->userRepository->executeBatchDecission($user_ids,$checker);
    }

    public function handleDeleteBatch(array $user_ids)
    {
        return $this->userRepository->batchDeleteAccount($user_ids);
    }
}
