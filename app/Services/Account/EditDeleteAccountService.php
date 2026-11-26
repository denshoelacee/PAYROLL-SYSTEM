<?php

namespace App\Services\Account;

use App\Contracts\Services\Account\IEditDeleteAccountService;
use App\Contracts\Repositories\IUserRepository;
use Illuminate\Support\Facades\Auth;


class EditDeleteAccountService implements IEditDeleteAccountService
{
    
    public function __construct(protected IUserRepository $userRepo){}

    public function deleteAccount(int $user_id): bool
    {

       if(Auth::id() == $user_id)
         {
           return false;
         }

         $find= $this->userRepo->findById($user_id);

         if(!$find)
         {
           return false;
         }  

          $find->delete();

          return true;
    }

    public function editAccount($id,array $data)
    {
      $user = $this->userRepo->findById($id);
      
      $user->update($data);
    }
}