<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\Services\Auth\EditDeleteAccountServiceInterface;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class EditDeleteAccountController extends Controller
{

    public function __construct(protected EditDeleteAccountServiceInterface $editDeleteAccountService){}

    public function deleteAccount($id)
    {
        try {
            $deleted = $this->editDeleteAccountService->deleteAccount($id);

        if (!$deleted) {
            return redirect()->back()->with('error', 'You can’t delete your own account.');
        }

        return redirect()->back()->with('success', 'Account deleted successfully.');
        } catch (Exception) {
            return redirect()->back()->with('error', 'An error occurred while deleting the account.');
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
            'employment_type' => ['sometimes', 'string']
        ]);

        try{
             $this->editDeleteAccountService->editAccount($id,$validated);
             return redirect()->back()->with('success','Update user successfully.');
        }
        catch(Exception){
             return redirect()->back()->with('error', 'You can\'t update user.');
        }
    }
}
