<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

         $user = $request->user();

         if($user->status !== 'verified'){
             auth()->logout();
             
                    return redirect()->route('login')->with(
                        $user->status ==='pending'
                           ? ['information' => 'Thanks for signing up! Your account is currently under review, and we`re working hard to get you set up. We appreciate your patience and will notify you as soon as your account is approved and ready to go']
                           : ['error' => 'Account is not approved or something went wrong.']
                    );
         }

            return redirect()->intended(
                $user->role === 'Admin' ? '/admin/dashboard' : '/employee/dashboard'
            );
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
