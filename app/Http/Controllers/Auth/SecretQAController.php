<?php

namespace App\Http\Controllers\Auth;

use App\Services\Auth\SecretQAService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SecretQAController extends Controller
{
    public function __construct(protected SecretQAService $secretQAService) {}

    public function store(Request $request):RedirectResponse
    {
        
        $validated = $request->validate([
            'current_password'    => 'required|string',
            'secret_question'     => 'required|string',
            'secret_answer'       => 'required|string'
        ]);
            
        $auth_user = Auth::user();

        if (Hash::check($validated['current_password'], $auth_user->password)) {
            if($auth_user->answerQuestion){
                $this->secretQAService->update($auth_user->answerQuestion->id, $validated);
            }else{
                $userId = Auth::id();   
                $validated['user_id'] = $userId;
                $this->secretQAService->create($validated);
            }
        } else {
            return redirect()->back()->with('error', 'Incorrect Password');
        }   
    
        return Redirect()->back()->with('success', 'Your secret question and answer were alls set successfully!');

    }
}