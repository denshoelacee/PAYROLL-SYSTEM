<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IPayrollService;
use App\Http\Controllers\Controller;
use App\Http\Requests\EditPublishRequest;
use App\Models\Payroll;
use Illuminate\Http\Request;

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

    public function payrollThisDay(Request $request)
    {
      $thisMonth = $this->payrollService->payrollThisMonth();

      $newPayroll = $this->payrollService->usersWithoutPayrollForCurrentMonth();

      $year = $request->year ?? now()->year;
    $month = $request->month ?? now()->month;

    $payslips = Payroll::join('users', 'payrolls.user_id', '=', 'users.user_id')
        ->select([
            'payrolls.created_at as pay_date',
            'users.user_id',
            'users.employee_id as employee_id',
            'users.last_name as last_name',
            'users.first_name as first_name',
            'users.designation as designation',
            'users.department as department',
            'users.employment_type as employment_type',

            'users.basic_pay',
            'payrolls.*'
        ])
        ->whereMonth('payrolls.created_at', $month)
        ->whereYear('payrolls.created_at', $year)
        ->get();

    // Example months data
    $months = collect(range(1, 12))->map(function ($m) {
        return [
            'number' => str_pad($m, 2, '0', STR_PAD_LEFT),
            'name' => \Carbon\Carbon::create()->month($m)->format('F'),
        ];
    });


      return Inertia::render(
                           'Admin/Payroll',
                           ['thisMonth' => $thisMonth,
                            'newPayroll' => $newPayroll,
                             'payslips' => $payslips,
                              'availableYears' => range(2025, now()->year),
                              'availableMonths' => $months,
                              'selectedYear' => (string)$year,
                              'selectedMonth' => str_pad($month, 2, '0', STR_PAD_LEFT),
                           ]
      );
    }

    public function editedPartialPublish(EditPublishRequest $request,$id)
    {
       $validated = $request->validated();
       $validated['publish_status'] = $request->input('publish_status'); 
      
       $this->payrollService->editedPartialPublishPayroll($validated,$id);
        //return dd($validated['publish_status']);

       redirect()->back()->with("success","Payroll Updated Successfully!");
    }
}
