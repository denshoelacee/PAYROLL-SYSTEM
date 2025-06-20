<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'employee_id'     => 'required|integer',
            'last_name'       => 'required|string|max:50',
            'first_name'      => 'required|string|lowercase|max:50',
            'designation'     => 'required|string|max:50',
            'department'      => 'required|string|max:50',
            'basic_pay'       => 'nullable|numeric|between:0,999999.99',
            'password'        => ['required', 'confirmed', Rules\Password::defaults()],
            'secret_password' => 'nullable|string|max:50',
        ]);

        $request->merge([
            'last_name'  => ucwords(strtolower($request->last_name)),
            'first_name' => ucwords(strtolower($request->first_name)),
        ]);


        $user = User::create([
            'employee_id'    => $request->employee_id,
            'last_name'      => $request->last_name,
            'first_name'     => $request->first_name,
            'designation'    => $request->designation,
            'department'     => $request->department,
            'basic_pay'      => $request->basic_pay,
            'password'       => Hash::make($request->password),
            'secret_password'=> $request->secrete_password,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
