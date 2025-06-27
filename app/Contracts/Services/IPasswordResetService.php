<?php

namespace App\Contracts\Services;

interface IPasswordResetService{

    public function resetPassword($validateReset);
}