<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\Services\Auth\IEditDeleteAccountService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EditDeleteAccountController extends Controller
{

    public function __construct(protected IEditDeleteAccountService $editDeleteAccountService){}

    public function deleteAccount($id)
    {

      try{
          $this->editDeleteAccountService->deleteAccount($id);
          return redirect()->back()->with('success','Account delete successfully.');
      }
      catch(\Exception $e){
          return redirect()->back()->with('error','You can\'t delete your account.');
      }
    }

    public function editAccount(Request $request,$id)
    {
        $commonRule = ['sometimes','string','max:50'];
      
        $validated = $request->validate([
            'first_name' => $commonRule,
            'last_name'  => $commonRule,
            'department' => $commonRule,
            'designation'=> $commonRule,
            'basic_pay'  => ['sometimes', 'numeric'],
            'role'       => ['sometimes', 'string', 'in:Admin,User'],
            'employment_type' => ['sometimes', 'string', 'in:Regular,Part-Time']
        ]);
        
        try{
             $this->editDeleteAccountService->editAccount($id,$validated);
             return redirect()->back()->with('success','Update user successfully.');
        }
        catch(\Exception $e){
             return redirect()->back()->with('error', 'You can\'t update user.');
        }
    }
}