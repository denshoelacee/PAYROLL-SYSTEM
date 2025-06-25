<?php

namespace App\Services;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IEmployeeService;

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
                'message' => 'Account Approved'
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
                    'message' => 'Account rejected.'
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
}