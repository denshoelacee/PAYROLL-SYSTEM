<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IPayrollService;
use App\Http\Controllers\Controller;
use App\Http\Requests\EditPublishRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminPayrollController extends Controller
{

    public function __construct(protected IPayrollService $payrollService){}
     
    
    public function savePartial(EditPublishRequest $request)
    {
      
       $this->payrollService->storePartial($request->validated());
      
    }

     public function publish(EditPublishRequest $request)
    {  
      
       try{
         $this->payrollService->publish($request->validated());
         return Redirect()->back()->with("success","Payroll Publish Successfully!");
       }catch(\Exception $e){
         return redirect()->back()->with("error", $e->getMessage());
       }
    }

    public function payrollThisDay()
    {
      $thisMonth = $this->payrollService->payrollThisMonth();

      $newPayroll = $this->payrollService->usersWithoutPayrollForCurrentMonth();

      return Inertia::render(
                           'Admin/Payroll',
                           ['thisMonth' => $thisMonth,
                            'newPayroll' => $newPayroll
                           ]
      );
    }

    public function editedPartialPublish(EditPublishRequest $request,$id)
    {
       $validated = $request->validated();
       $validated['publish_status'] = $request->get('publish_status', 'partial'); 
       $this->payrollService->editedPartialPublishPayroll($validated,$id);
      
       redirect()->back()->with("success","Payroll Updated Successfully!");
    }
}
