<?php

namespace App\Repository;

use App\Contracts\Repository\SecretQuestionRepositoryInterface;
use App\Models\User;

class SecretQuestionRepository implements SecretQuestionRepositoryInterface
{

    public function registerSecretQuestion(User $user,array $data):void
    {
       $user->answerQuestion()->create($data);
    }
}
