<?php

namespace App\Contracts\Services\Account;

interface IBatchDecisionService
{
    public function handleApproveRejectBatch(array $user_ids, string $checker);

    public function handleDeleteBatch(array $user_ids);
    
}