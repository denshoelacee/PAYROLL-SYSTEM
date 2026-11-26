<?php

namespace App\Repositories;

use App\Contracts\Repositories\ISecretQuestionRepository;
use App\Models\User;

class SecretQuestionRepository implements ISecretQuestionRepository
{

    public function registerSecretQuestion(User $user,array $data):void
    {
       $user->answerQuestion()->create($data);
    }
}