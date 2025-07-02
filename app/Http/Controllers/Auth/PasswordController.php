<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Models\User;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
         $validated = $request->validate([
            'employee_id' => 'required|numeric|exists:users,employee_id',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::where('employee_id', $validated['employee_id'])->first();

        $user->password = Hash::make($validated['password']);
        $user->save();

        session()->forget('resetPasswordSession');
        return redirect()->route('login')->with('success','Password has been reset.');
    }
}