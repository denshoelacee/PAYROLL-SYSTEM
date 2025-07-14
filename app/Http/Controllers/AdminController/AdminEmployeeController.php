<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IEmployeeService;
use App\Contracts\Services\IJobTitleService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Models\User;


class AdminEmployeeController extends Controller
{

    public function __construct(protected IEmployeeService $employeeService,protected IJobTitleService $jobTitleService){}
   
    /**
     * Display a listing of the resource.
     */
    public function employee()
    {
            $jobtitles = $this->jobTitleService->getJobTitleService();
            $pendings = $this->employeeService->pendingUsers();
            $employeelist    = $this->employeeService->employeeList();
             return Inertia::render('Admin/Employee',
                ['pendingUsers' => $pendings,
                 'employeeList'  => $employeelist,
                 'jobtitles' => $jobtitles
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
    /**
     * Show the form for creating a new resource.
     */
    public function index(Request $reject)
    {
         $pendings = $this->employeeService->pendingUsers();
         $employeelist = $this->employeeService->employeeList();

          return response()->json([
  
            'userList' => $employeelist,
        ]);
    }

}
