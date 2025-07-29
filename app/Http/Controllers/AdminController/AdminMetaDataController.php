<?php

namespace App\Http\Controllers\AdminController;
use App\Contracts\Services\IHrMetaDataService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Termwind\Components\Raw;

class AdminMetaDataController extends Controller
{
    public function __construct(protected IHrMetaDataService $metadataService){}

    public function displayEmpTypeList()
    {
       $empTypeList = $this->metadataService->empTypeList();
       $jobTitleList = $this->metadataService->jobTitleList();
    
        return Inertia::render('Admin/Department',
                [
                   'empTypeList' => $empTypeList,
                   'jobTitleList' => $jobTitleList
                ]);
    }

    public function createEmploymentType(Request $request):RedirectResponse
    {      
        $data = $request->validate([
            'employment_type_list' => 'nullable|string'
        ]);
        try{
            $this->metadataService->createEmpType($data);
            return redirect()->back()->with('success','Add Employment Type Successfully!');
        }catch(\Exception $e){
            return redirect()->back()->with('error','Something Wrong');
        }
    }

    public function updateEmploymentType(Request $request,int $id):RedirectResponse
    {   
        $validated = $request->validate([
        'employment_type_list' => 'required|string'
        ]);
        
        try{
            $this->metadataService->updateEmpType($id,$validated);
            return redirect()->back()->with('success','Update Employment Type Successfully!');
        }catch(\Exception $e){
            return redirect()->back()->with('error','Something Wrong!');
        }
    }

    public function deleteEmploymentType(int $id)
    {
        try{
            $this->metadataService->deleteEmpType($id);
            return redirect()->back()->with('success','Delete Employee Type Successfully!');
        }catch(\Exception $e){
             return redirect()->back()->with('error','Something Wrong!');
        }
    }

    public function createPositions(Request $request)
    {
         $data = $request->validate([
            'department' => 'nullable|string|max:50',
            'desination' => 'nullable|string|max:50'
         ]);

         $checker = $request->input('checker');

         try{
             $this->metadataService->addJobTitle($data,$checker);
             return Redirect()->back()->with('success','Added Department Successfully.');
         }catch(\Exception $e){
            return redirect()->back()->with('error','Something Wrong!');
         }
    }

    public function updateJobTitle(Request $request, $id)
    {
         $data = $request->validate([
            'department' => 'nullable|string|max:50',
            'designation' => 'nullable|string|max:50'
         ]);

         try{
             $this->metadataService->updatePositions( $id, $data);
             return redirect()->back()->with('success','Added Successfully.');
         }catch(\Exception $e){
            return redirect()->back()->with('error','Something Wrong!');
         }
    }

    public function deleteJobTitle(Request $request, $id)
    {
         $checker = $request->input('checker');
         
        try{
            $this->metadataService->destroyJobtitle($id,$checker);
            return redirect()->back()->with('success','Delete Successfully.');
        }catch(\Exception $e){
            return redirect()->back()->with('error','Something Wrong!');
        }
    }
}
