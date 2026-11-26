<?php

namespace App\Http\Controllers\Admin;

use App\Contracts\Services\Account\IBatchDecisionService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BatchDecisionController extends Controller
{
      public function __construct(protected IBatchDecisionService $batchDecisionService){}

    public function batchApprove(Request $request)
    {
       $validated = $request->validate([
                'user_ids' => 'required|array',
                'user_ids.*' =>'integer|exists:users,user_id'
            ]);
        $checker = 'toApproved';
        
       try{
           $this->batchDecisionService->handleApproveRejectBatch($validated['user_ids'],$checker);
           return redirect()->back()->with('success',"Great! You've successfully approved all selected users");
       } 
      catch(\Exception $e){
            return redirect()->back()->with('error', 'Something went wrong.');
      }
    }

    public function batchReject(Request $request)
    {
       $validated = $request->validate([
                'user_ids' => 'required|array',
                'user_ids.*' =>'integer|exists:users,user_id'
            ]);
        $checker = 'toRejected';
        
       try{
           $this->batchDecisionService->handleApproveRejectBatch($validated['user_ids'],$checker);
           return redirect()->back()->with('success','Selected users have been rejected successfully.');
       } 
      catch(\Exception $e){
            return redirect()->back()->with('error', 'Something went wrong.');
      }
    }

    public function batchDelete(Request $request)
    {
        $validated = $request->validate([
                'user_ids' => 'required|array',
                'user_ids.*' =>'integer|exists:users,user_id'
            ]);

        try{       
            $this->batchDecisionService->handleDeleteBatch($validated['user_ids']);
            return redirect()->back()->with('success','Selected users have been deleted successfully.');
        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Something went Wrong.');
        }
    }
}