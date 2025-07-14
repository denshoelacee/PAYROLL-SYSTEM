<?php

namespace App\Services\Auth;

use App\Contracts\Services\Auth\IEditDeleteAccountService;
use App\Repository\UserRepository;
use Illuminate\Support\Facades\Auth;

class EditDeleteAccountService implements IEditDeleteAccountService
{
    
    public function __construct(protected UserRepository $useRepo){}

    public function deleteAccount(int $user_id): bool
    {

       if(Auth::id() == $user_id)
         {
           return false;
         }

         $find= $this->useRepo->findById($user_id);

         if(!$find)
         {
           return false;
         }  

          $find->delete();
          
          return true;
    }
}