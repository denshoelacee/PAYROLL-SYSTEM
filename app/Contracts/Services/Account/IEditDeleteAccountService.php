<?php

namespace App\Contracts\Services\Account;

interface IEditDeleteAccountService
{
    
    public function deleteAccount(int $user_id): bool;

    
    public function editAccount($id,array $data);
}