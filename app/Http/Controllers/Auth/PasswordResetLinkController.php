<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IPasswordReset;
use App\Contracts\Services\IPasswordResetService;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
         public function __construct(protected IPasswordResetService $passResetService){}

    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        $validateReset = $request->validate([
                'employee_id' => 'required|integer',
                'secret_question' => 'required|string',
                'secret_answer' => 'required|string',
            ]);
        try
        {
            $this->passResetService->resetPassword($validateReset);
            return redirect()->back()->with('success','Proceed Now.');
        }
        catch(\Exception $e)
        {
           return redirect()->back()->with('error','The provided credentials do not match our records.');
        }
            
    }
}
