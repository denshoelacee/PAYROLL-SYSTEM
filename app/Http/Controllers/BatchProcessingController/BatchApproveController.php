<?php

namespace App\Http\Controllers\BatchProcessingController;

use App\Contracts\Services\IBatchApproveAccountService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BatchApproveController extends Controller
{
      public function __construct(protected IBatchApproveAccountService $batchApproveAccountService){}

    public function batchApprove(Request $request)
    {

       $validated = $request->validate([
                'user_ids' => 'required|array',
                'user_ids.*' =>'integer|exists:users,user_id'
            ]);
       try{
           $this->batchApproveAccountService->accountApproval($validated['user_ids']);
           return redirect()->back()->with('success','All pending user accounts have been approved. Done!');
       } 
      catch(\Exception $e){
            return redirect()->back()->with('error', 'Something went wrong.');
      }
    }
}