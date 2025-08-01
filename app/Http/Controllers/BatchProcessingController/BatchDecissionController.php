<?php

namespace App\Http\Controllers\BatchProcessingController;

use App\Contracts\Services\Auth\IExecuteBatchDecissionService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BatchDecissionController extends Controller
{
      public function __construct(protected IExecuteBatchDecissionService $batchDecissionService){}

    public function batchApprove(Request $request)
    {
       $validated = $request->validate([
                'user_ids' => 'required|array',
                'user_ids.*' =>'integer|exists:users,user_id'
            ]);
        $checker = 'toApproved';
        
       try{
           $this->batchDecissionService->handleApproveRejectBatch($validated['user_ids'],$checker);
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
           $this->batchDecissionService->handleApproveRejectBatch($validated['user_ids'],$checker);
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
            $this->batchDecissionService->handleDeleteBatch($validated['user_ids']);
            return redirect()->back()->with('success','Selected users have been deleted successfully.');
        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Something went Wrong.');
        }
    }
}