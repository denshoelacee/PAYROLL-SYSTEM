<?php

namespace App\Http\Controllers\Admin;

use App\Contracts\Services\Account\ICreateAccountService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CreateAccountController extends Controller
{

    public function __construct(protected ICreateAccountService $createAccountService){}
    public function store(Request $request):RedirectResponse
    {
       $request->validate([
            'employee_id' => 'required|integer',
            'last_name' => 'required|string|max:50',
            'first_name' => 'required|string|max:50',
            'department' => 'required|string|max:50',
            'designation' => 'required|string|max:50',
            'employment_type' => 'required|string|max:50',
            'basic_pay' => 'nullable|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'role' => 'required|string|max:50',
       ]);
      
       try{
           $this->createAccountService->register($request);
           return redirect()->back()->with('success','Added new account successfully.');
       }catch(\Exception $e){
            return redirect()->back()->with('error', 'Employee ID already taken.');
       }
    }
}