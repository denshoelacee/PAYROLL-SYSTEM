<?php

namespace App\Services;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IPasswordResetService;
use Illuminate\Support\Facades\Hash;

class PasswordResetService implements IPasswordResetService{

    public function __construct(protected IUserRepository $userRepo){}


    public function resetPassword($validateReset)
    { 
        
        $user = $this->userRepo->getResetPassword($validateReset);

        if (!$user) {
            throw new \Exception("User not found.");
        }

        $answer = $user->answerQuestion->firstWhere('secret_question', $validateReset['secret_question']);

        if (!$answer || !Hash::check($validateReset['secret_answer'], $answer->secret_answer)) {
            throw new \Exception("Incorrect secret answer.");
        }

        return $user;
    }
}