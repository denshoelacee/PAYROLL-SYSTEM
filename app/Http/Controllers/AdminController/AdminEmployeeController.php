<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IEmployeeService;
use App\Contracts\Services\IHrMetaDataService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;


class AdminEmployeeController extends Controller
{

    public function __construct(
             protected IEmployeeService $employeeService,
             protected IHrMetaDataService $metaDataService
    ){}
   
    /**
     * Display a listing of the resource.
     */
    public function employee()
    {
            $jobtitles = $this->metaDataService->jobTitleList();
            $pendings = $this->employeeService->pendingUsers();
            $employeelist = $this->employeeService->employeeList();
            $empTypeList = $this->metaDataService->empTypeList();

             return Inertia::render('Admin/Employee',
                ['pendingUsers' => $pendings,
                 'employeeList'  => $employeelist,
                 'jobtitles' => $jobtitles,
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
}
