<?php

namespace App\Services;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IPasswordResetService;
use Illuminate\Support\Facades\Hash;

class PasswordResetService implements IPasswordResetService{

    public function __construct(protected IUserRepository $userRepo){}


    public function resetPassword($validateReset)
    {
        $validate = $this->userRepo->getResetPassword($validateReset);

      
          if($validate || Hash::check($validate->secret_answer, $validate->secret_answer)){
             
          }
        return $validate;
    }
}