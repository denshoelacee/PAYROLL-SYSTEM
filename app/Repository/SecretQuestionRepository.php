<?php

namespace App\Repository;

use App\Contracts\Repository\SecretQuestionRepositoryInterface;
use App\Models\SecretQuestion;
use App\Models\User;

class SecretQuestionRepository implements SecretQuestionRepositoryInterface
{

    public function registerSecretQuestion(User $user,array $data):void
    {

        $user->answerQuestion()->create($data);

    }

    public function findById($id): ?SecretQuestion
    {
      
        return SecretQuestion::findOrFail($id);

    }

    public function create(array $data): SecretQuestion
    {

        return SecretQuestion::create($data);

    }

    public function update(int $id, array $data): ?SecretQuestion
    {

        $user = $this->findById($id);

            if(!$user){
        
               return null;

            }

            $user->update($data);

            return $user;

    }


}
