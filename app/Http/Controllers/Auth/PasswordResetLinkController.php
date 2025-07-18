<?php

namespace App\Http\Controllers\Auth;


use App\Contracts\Services\Auth\IPasswordResetService;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
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
    public function reset(Request $request)
{
    $request->validate([
        'employee_id' => 'required|integer',
        'secret_question' => 'required|string',
        'secret_answer' => 'required|string',
    ]);

    try {
        
        $validated = $request->only(['employee_id', 'secret_question', 'secret_answer']);
        $validated['secret_question'] = strtolower(trim($validated['secret_question']));
        $validated['secret_answer'] = strtolower(trim($validated['secret_answer']));

        $user = $this->passResetService->resetPassword($validated);

         session()->put([
                        'resetPasswordSession' => $user->employee_id,
                        'resetPasswordExpireAt' => now()->addMinutes(15),
                        ]);

        return redirect()->route('password.reset.form', ['employee_id' => $user->employee_id]);

    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'The secret question and answer do not match our records.');
    }
}


}
