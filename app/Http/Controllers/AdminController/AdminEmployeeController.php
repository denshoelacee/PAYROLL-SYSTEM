<?php

namespace App\Http\Controllers\AdminController;

use App\Services\EmployeeManagementService;
use App\Services\HrMetaDataService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AdminEmployeeController extends Controller
{

    public function __construct(
             protected EmployeeManagementService $employeeService,
             protected HrMetaDataService $metaDataService
    ){}

    /**
     * Display a listing of the resource.
     */
    public function employee()
    {
            $jobtitles    = $this->metaDataService->jobTitleList();
            $pendings     = $this->employeeService->pendingUsers();
            $employeelist = $this->employeeService->employeeList();
            $empTypeList  = $this->metaDataService->empTypeList();

             return Inertia::render('Admin/Employee',
                [
                 'pendingUsers'     => $pendings,
                 'employeeList'     => $employeelist,
                 'jobtitles'        => $jobtitles,
                 'employeeTypeList' => $empTypeList
                ]
        );
    }

    public function approve($id):RedirectResponse
    {
        $verified = $this->employeeService->approveAccount($id);

        if($verified['success'])
        {
             return redirect()->back()->with('success', $verified['message']);
        }else{
            return redirect()->back()->with('error', $verified['message']);
        }
    }


    public function reject($id):RedirectResponse
    {
        $reject = $this->employeeService->rejectAccount($id);

        if($reject['success'])
        {
             return redirect()->back()->with('success', $reject['message']);
        }else{
            return redirect()->back()->with('error', $reject['message']);
        }
    }

    public function batchApprove(Request $request)
    {
        
       $validated = $request->validate([
                'user_ids' => 'required|array',
                'user_ids.*' =>'integer|exists:users,user_id'
            ]);
        $checker = 'toApproved';

       try{
           $this->employeeService->handleApproveRejectBatch($validated['user_ids'],$checker);
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
           $this->employeeService->handleApproveRejectBatch($validated['user_ids'],$checker);
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
            $this->employeeService->handleDeleteBatch($validated['user_ids']);
            return redirect()->back()->with('success','Selected users have been deleted successfully.');
        }catch(\Exception $e){
            return redirect()->back()->with('error', $e->getMessage());
        }

    }
}
