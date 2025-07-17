<?php

namespace App\Contracts\Services\Auth;

interface IPasswordResetService{

    public function resetPassword($validateReset);
}