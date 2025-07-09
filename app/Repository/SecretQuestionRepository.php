<?php

namespace App\Repository;

use App\Contracts\Repository\ISecretQuestionRepository;
use App\Models\User;

class SecretQuestionRepository implements ISecretQuestionRepository
{

    public function registerSecretQuestion(User $user,array $data):void
    {
       $user->answerQuestion()->create($data);
    }
}