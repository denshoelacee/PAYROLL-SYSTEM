<?php

namespace App\Contracts\Services\Auth;

interface ExecuteBatchDecisionServiceInterface
{
    public function handleApproveRejectBatch(array $user_ids, string $checker);

    public function handleDeleteBatch(array $user_ids);

}
