<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\PayrollServiceInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayslipsReportServiceInterface;
use App\Contracts\Services\HrMetaDataServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\EditPublishRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AdminPayrollController extends Controller
{

    public function __construct(
              protected PayrollServiceInterface                $payrollService,
              protected GeneratePayslipsReportServiceInterface $payslipsReportService,
              protected HrMetaDataServiceInterface $metaDataService

    ){}


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

public function payrollThisDay(Request $request, $type, $id = null)
{
   
    $year = $request->year ?? now()->year;
    $month = $request->month ?? now()->month;
    $selectedType = $request->input('employmentType'); 

    $filteredEmployementType = $this->payrollService->selectEmploymentSalaryType($selectedType); // add modal select Employement type 

    $newPayroll = $this->payrollService->usersWithoutPayrollForCurrentMonth($id);   //fetch latest Payroll for add Payroll
    
    $payslips = $this->payslipsReportService->UserPayrollMonthly($year, $month);   //Year Month Payrolls

    $jobLists = $this->metaDataService->jobTitleList();   //Job List -> EMPLOYMENT TYPE (PART-TIME )REGULAR AND JO CAN ASSIGNED MULTITPLE JOB WORK

    $months = collect(range(1, 12))->map(function ($m) {
        return [    
            'number' => str_pad($m, 2, '0', STR_PAD_LEFT),
            'name' => \Carbon\Carbon::create()->month($m)->format('F'),
        ];
    });

    return Inertia::render('Admin/Payroll', [
        'newPayroll' => $newPayroll,
        'filteredEmployementType' => $filteredEmployementType,
        'payslips' => $payslips,
        'availableYears' => range(2025, now()->year),
        'availableMonths' => $months,
        'selectedYear' => (string)$year,
        'selectedMonth' => str_pad($month, 2, '0', STR_PAD_LEFT),
    ]);
}


    public function editedPartialPublish(EditPublishRequest $request,$id)
    {
       $validated = $request->validated();
       $validated['publish_status'] = $request->input('publish_status');

       $this->payrollService->editedPartialPublishPayroll($validated,$id);

       redirect()->back()->with("success","Payroll Updated Successfully!");
    }
}
