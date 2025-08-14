<?php

namespace App\Contracts\Services\Auth;

interface PasswordResetServiceInterface{

    public function resetPassword($validateReset);
}
