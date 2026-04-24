<?php

namespace App\Services\Auth;

use App\Contracts\Repository\UserRepositoryInterface;
use App\Contracts\Services\Auth\ExecuteBatchDecisionServiceInterface;

class ExecuteBatchDecisionService
{

    public function __construct(protected UserRepositoryInterface $userRepository){}

    public function handleApproveRejectBatch(array $user_ids, string $checker)
    {
       return $this->userRepository->executeBatchDecission($user_ids,$checker);
    }

    public function handleDeleteBatch(array $user_ids)
    {
        return $this->userRepository->batchDeleteAccount($user_ids);
    }
}
