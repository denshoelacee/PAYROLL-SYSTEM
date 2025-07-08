<?php

namespace App\Contracts\Repository;

use App\Models\User;

interface ISecretQuestionRepository
{

    public function registerSecretQuestion(User $user,array $data):void;
}