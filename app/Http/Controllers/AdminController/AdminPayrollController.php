<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\PayrollServiceInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayslipsReportServiceInterface;
use App\Contracts\Services\HrMetaDataServiceInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\EditPublishRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AdminPayrollController extends Controller
{

    public function __construct(
              protected PayrollServiceInterface                $payrollService,
              protected GeneratePayslipsReportServiceInterface $payslipsReportService,
              protected HrMetaDataServiceInterface             $metaDataService

    ){}


    /**
     * Partially publish payroll (selected employees or departments)
     */
    public function savePartial(EditPublishRequest $request)
    {

       $this->payrollService->storePartial($request->validated());

    }

    /**
     * Finalize and publish payroll for the specified period
     */
    public function publish(EditPublishRequest $request)
    {
    // dd($request->validated());
       try{
         $this->payrollService->publish($request->validated());
         return redirect()->back()->with("success","Payroll Publish Successfully!");
       }catch(\Exception $e){
         return redirect()->back()->with("error", $e->getMessage());
       }
    }

    /**
     * Display payroll management dashboard with monthly data
     * 
     * @param Request $request Filter parameters (year, month, employmentType)
     * @param string $type Employment type filter
     * @param int|null $id Optional ID filter
     * @return \Inertia\Response Payroll management page
     */
    public function payrollThisDay(Request $request, $type, $id = null)
    {
    
        $year = $request->year ?? now()->year;
        $month = $request->month ?? now()->month;
        $selectedType = $request->input('employmentType'); 

        $filteredEmployementType = $this->payrollService->selectEmploymentSalaryType($selectedType);

        $newPayroll = $this->payrollService->usersWithoutPayrollForCurrentMonth($id,$type); 
        
        $payslips = $this->payslipsReportService->UserPayrollMonthly($year, $month); 

        $jobLists = $this->metaDataService->jobTitleList();   

        $months = array_map(function ($m) {
            return [
                'number' => str_pad($m, 2, '0', STR_PAD_LEFT),
                'name' => date('F', mktime(0, 0, 0, $m, 1)),
            ];}, range(1, 12));

        return Inertia::render('Admin/Payroll', [
            'newPayroll' => $newPayroll,
            'filteredEmployementType' => $filteredEmployementType,
            'payslips' => $payslips,
            'availableYears' => range(2025, now()->year),
            'availableMonths' => $months,
            'selectedYear' => (string)$year,
            'selectedMonth' => str_pad($month, 2, '0', STR_PAD_LEFT),
            'jobLists' => $jobLists,
        ]);
    }


    /**
     * Publish selected/partial payroll data
     * 
     * @param EditPublishRequest $request Validated payroll data
     * @param int $id Payroll ID to publish
     * @return RedirectResponse
     */
    public function editedPartialPublish(EditPublishRequest $request, $id): RedirectResponse
    {
        $validated = $request->validated();
        $validated['publish_status'] = $request->input('publish_status');

        try {
            $this->payrollService->editedPartialPublishPayroll($validated, $id);
            return redirect()->back()->with("success", "Payroll published successfully!");
        } catch(\Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }


    /**
     * Display the specified payslip
     * 
     * @param int $payslipId
     * @return \Illuminate\View\View|\Inertia\Response
     */
    public function ViewPayslipById($payslip_id)
    {

       
        $payslip = $this->payslipsReportService->viewPayslipByPayrollId($payslip_id);
        
        return Inertia::render('Admin/ViewPayslip', [
            'payslip' => $payslip
        ]);

    }

    public function getUpdatePayroll($payroll_id, $payslip_type)
    {
    try {
        $editPayroll = $this->payrollService->updatePayslipById($payroll_id, $payslip_type);
        
        if (!$editPayroll) {
            return Inertia::render('Admin/Payroll', [
                'error' => 'Payroll not found'
            ]);
        }

        return Inertia::render('Admin/Payroll', [
            'editPayroll' => $editPayroll
        ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Payroll', [
                'error' => 'Failed to load payroll data',
                'message' => $e->getMessage(),  
            ]);
        }
    }
}
