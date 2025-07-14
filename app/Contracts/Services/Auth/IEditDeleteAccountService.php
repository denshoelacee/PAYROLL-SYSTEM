<?php

namespace App\Contracts\Services\Auth;

interface IEditDeleteAccountService
{
    
    public function deleteAccount(int $user_id): bool;

    
    public function editAccount($id,array $data);
}