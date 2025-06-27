<?php

namespace App\Services;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IPasswordResetService;
use Illuminate\Support\Facades\Hash;

class PasswordResetService implements IPasswordResetService{

    public function __construct(protected IUserRepository $userRepo){}


    public function resetPassword($validateReset)
    {
        $match = $this->userRepo->getResetPassword($validateReset);

      
          if (!Hash::check($validateReset['secret_answer'], $match->secret_answer)) {
        throw new \Exception("Incorrect secret answer.");
    }   

        return $match;
    }
}