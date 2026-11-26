<?php

namespace App\Contracts\Repositories;

use App\Models\User;

interface ISecretQuestionRepository
{

    public function registerSecretQuestion(User $user,array $data):void;
}