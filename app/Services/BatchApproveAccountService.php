<?php

namespace App\Services;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IBatchApproveAccountService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class BatchApproveAccountService implements IBatchApproveAccountService
{
    public function __construct(protected IUserRepository $userRepo) {}

    public function accountApproval(array $user_ids): array
    {
       
        try {
            $this->userRepo->batchApproveAccount($user_ids);

            return [
                'success' => true,
                'message' => 'Approve Accounts Successfully.',
            ];
        } catch (\Exception $e) {
            Log::error('Batch approval failed', ['error' => $e->getMessage()]);

            return [
                'error' => true,
                'message' => 'Something went wrong. Please try again.',
            ];
        }
    }
}
