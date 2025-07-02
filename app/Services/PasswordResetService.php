<?php

namespace App\Services;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IPasswordResetService;
use Illuminate\Support\Facades\Hash;

class PasswordResetService implements IPasswordResetService
{
    public function __construct(protected IUserRepository $userRepo) {}

    public function resetPassword($validateReset)
    {
        $user = $this->userRepo->getResetPassword($validateReset);

        if (!$user) {
            throw new \Exception("User not found.");
        }

        $inputQuestion = strtolower(trim($validateReset['secret_question']));
        $inputAnswer   = strtolower(trim($validateReset['secret_answer']));

        $answer = $user->answerQuestion()->get()->first(function ($item) use ($inputQuestion) {
            return strtolower(trim($item->secret_question)) === $inputQuestion;
        });

        if (!$answer || !isset($answer->secret_answer) || !Hash::check($inputAnswer, $answer->secret_answer)) {
            throw new \Exception("Incorrect secret answer.");
        }

        return $user;
    }

}
