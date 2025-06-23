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
            'password'        => ['required', 'confirmed', Rules\Password::defaults()],
            'employment_type' => 'required|string|max:50',
            'secret_question' => 'required|string|max:100',
            'secret_answer'   => 'required|string|max:50',
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
            'employment_type'=> $request->employment_type,
        ]);
        $user->SecretQuestion()->create([
            'secret_question' => $request->secret_question,
            'secret_answer'   => $request->secret_answer
        ]);

        return redirect()->back()->with('message','Create successfully, Please wait for approval.');
    }
}
    