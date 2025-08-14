<?php

namespace App\Contracts\Repository;

use App\Models\User;

interface SecretQuestionRepositoryInterface
{

    public function registerSecretQuestion(User $user,array $data):void;
}
