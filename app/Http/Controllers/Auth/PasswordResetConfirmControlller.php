<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasswordResetConfirmControlller extends Controller 
{


    public function passwordReset($employee_id)
    {
        if(session('resetPasswordSession') != $employee_id)
        {
            return Inertia::render('Errors/Error419')->toResponse(request())->setStatusCode(419);
        }
        return Inertia::render('Auth/ResetPassword',
          ['employee_id' => $employee_id]
        );
    }

}