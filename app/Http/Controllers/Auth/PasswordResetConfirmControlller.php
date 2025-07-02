<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasswordResetConfirmControlller extends Controller 
{


    public function passwordReset($employee_id)
    {
        $expireAt = session('resetPasswordExpireAt');

        if (session('resetPasswordSession') != $employee_id || !$expireAt || now()->greaterThan($expireAt))
         {
            session()->forget(['resetPasswordSession', 'resetPasswordExpireAt']);
            return Inertia::render('Errors/Error419')->toResponse(request())->setStatusCode(419);
         }

         return Inertia::render('Auth/ResetPassword',
                [
                    'employee_id' => $employee_id,
                    'expires_at' => session('resetPasswordExpireAt'),
                ]);
    }

}