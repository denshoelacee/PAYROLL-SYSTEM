<?php

namespace App\Http\Controllers\AdminController;
use App\Contracts\Services\IHrMetaDataService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
}
