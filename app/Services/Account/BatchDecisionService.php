<?php

namespace App\Services\Account;

use App\Contracts\Repositories\IUserRepository;
use App\Contracts\Services\Account\IBatchDecisionService;

class BatchDecisionService implements IBatchDecisionService
{

    public function __construct(protected IUserRepository $userRepository){}

    public function handleApproveRejectBatch(array $user_ids, string $checker)
    {
       return $this->userRepository->executeBatchDecision($user_ids,$checker);       
    }

    public function handleDeleteBatch(array $user_ids)
    {
        return $this->userRepository->batchDeleteAccount($user_ids);
    }
}