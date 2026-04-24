<?php

namespace App\Http\Controllers\AdminController;
use App\Services\HrMetaDataService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMetaDataController extends Controller
{
    public function __construct(protected HrMetaDataService $metadataService){}

    public function displayEmpTypeList()
    {
       $empTypeList      = $this->metadataService->empTypeList();
       $jobTitleList     = $this->metadataService->jobTitleList();
       $contributionType = $this->metadataService->displayContributionType();

        return Inertia::render('Admin/Department',
                [
                   'contributionType' => $contributionType,
                   'empTypeList'      => $empTypeList,
                   'jobTitleList'     => $jobTitleList,
                ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rlip' => ['nullable', 'numeric', 'lt:100', 'regex:/^\d{1,2}(\.\d{1,2})?$/'],
            'philhealth' => ['nullable', 'numeric', 'lt:100', 'regex:/^\d{1,2}(\.\d{1,2})?$/'],
        ], [
            'rlip.numeric' => 'RLIP must be a valid number.',
            'rlip.lt' => 'RLIP must be less than 100.',
            'rlip.regex' => 'RLIP can have up to 2 decimal places only.',
            'philhealth.numeric' => 'PhilHealth must be a valid number.',
            'philhealth.lt' => 'PhilHealth must be less than 100.',
            'philhealth.regex' => 'PhilHealth can have up to 2 decimal places only.',
        ]);
        try{
             $this->metadataService->addContributionType($validated);
             return redirect()->back()->with('success','Added successfully.');
        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Something Wrong!');
        }
    }
    public function createEmploymentType(Request $request):RedirectResponse
    {
        $data = $request->validate([
            'employment_type_list' => 'nullable|string'
        ]);
        try{
            $this->metadataService->createEmpType($data);
            return redirect()->back()->with('success','Great! The new Employement Type was added successfully.');
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
            return redirect()->back()->with('success','Employment Type updated Successfully!');
        }catch(\Exception $e){
            return redirect()->back()->with('error','Something Wrong!');
        }
    }

    public function deleteEmploymentType(int $id)
    {
        try{
            $this->metadataService->deleteEmpType($id);
            return redirect()->back()->with('success','Employment Type deleted successfully.');
        }catch(\Exception $e){
             return redirect()->back()->with('error','Something Wrong!');
        }
    }

    public function createPositions(Request $request)
    {
         $data = $request->validate([
            'department' => 'nullable|string|max:50',
            'designation' => 'nullable|string|max:50'
         ]);

         $checker = $request->input('checker');

         try{
             $this->metadataService->addJobTitle($data,$checker);
             return Redirect()->back()->with('success','Great! The new Position was added successfully.');
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
             return redirect()->back()->with('success','Great! The Position details were updated successfully.');
         }catch(\Exception $e){
            return redirect()->back()->with('error','Something Wrong!');
         }
    }

    public function deleteJobTitle(Request $request, $id)
    {
         $checker = $request->input('checker');
         //dd($checker);
        try{
            $this->metadataService->destroyJobtitle($id,$checker);
            return redirect()->back()->with('success','Position deleted successfully..');
        }catch(\Exception $e){
            return redirect()->back()->with('error','Something Wrong!');
        }
    }
}
