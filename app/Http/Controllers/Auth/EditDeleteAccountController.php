<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\Services\Auth\IEditDeleteAccountService;
use App\Http\Controllers\Controller;

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
          return redirect()->back()->with('error','You cant delete your account.');
      }
    }
}