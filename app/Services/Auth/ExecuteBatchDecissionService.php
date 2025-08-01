<?php

namespace App\Services\Auth;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\Auth\IExecuteBatchDecissionService;

class ExecuteBatchDecissionService implements IExecuteBatchDecissionService
{

    public function __construct(protected IUserRepository $userRepository){}

    public function handleApproveRejectBatch(array $user_ids, string $checker)
    {
       return $this->userRepository->executeBatchDecission($user_ids,$checker);       
    }

    public function handleDeleteBatch(array $user_ids)
    {
        return $this->userRepository->batchDeleteAccount($user_ids);
    }
}