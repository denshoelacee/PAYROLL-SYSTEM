<?php

namespace App\Contracts\Repository;

use App\Models\User;
use App\Models\SecretQuestion;

interface SecretQuestionRepositoryInterface
{

    public function registerSecretQuestion(User $user,array $data):void;


    public function create(array $data): SecretQuestion;

    public function update(int $id, array $data): ?SecretQuestion;
    
}
