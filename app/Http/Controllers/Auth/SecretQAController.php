<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SecretQAController extends Controller
{

    public function store(Request $request):RedirectResponse
    {
        
          $validated = $request->validate([
               'secret_question' => 'required|string',
               'secret_answer'   => 'required|string'
          ]);
              
          
            
    
        return Redirect()->back()->with('success', 'Your secret question and answer were alls set successfully!');

    }
}