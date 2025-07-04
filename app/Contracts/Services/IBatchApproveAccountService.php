<?php

namespace App\Contracts\Services;
use Illuminate\Http\Request;

interface IBatchApproveAccountService{


    public function accountApproval(array $user_ids): array;
}