<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IPayrollService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPayrollController extends Controller
{

    public function __construct(protected IPayrollService $payrollService){}
     
    
    public function savePartial(Request $request)
    {
       $monetaryRule = ['sometimes', 'nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'];
       
       $validated = $request->validate([
              'user_id' => ['required','exists:users,user_id'],
              'pera' => $monetaryRule,
              'absent' => $monetaryRule,
              'late' => $monetaryRule,
              'holding_tax' => $monetaryRule,
              'tax_bal_due' => $monetaryRule,
              'policy_loan' => $monetaryRule,
              'consol_loan' => $monetaryRule,
              'emerg_loan' => $monetaryRule,
              'gel' => $monetaryRule,
              'gfal' => $monetaryRule,
              'mpl' => $monetaryRule,
              'mpl_lite' => $monetaryRule,
              'contributions' => $monetaryRule,
              'loans' => $monetaryRule,
              'housing_loan' => $monetaryRule,
              'cfi' => $monetaryRule,
              'tipid' => $monetaryRule,
              'city_savings_bank' => $monetaryRule,
              'fea' => $monetaryRule,
              'canteen' => $monetaryRule,
              'disallowance' => $monetaryRule,
              'unliquidated_ca' => $monetaryRule,
              'disallowance_honoraria' => $monetaryRule,
              'coop' => $monetaryRule,
              'landbank' => $monetaryRule,
              'ucpb' => $monetaryRule,
       ]);

       $this->payrollService->storePartial($validated);
      
    }

     public function publish(Request $request)
    {
       $monetaryRule = ['sometimes', 'nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'];
       
       $validated = $request->validate([
              'user_id' => ['required','exists:users,user_id'],
              'pera' => $monetaryRule,
              'absent' => $monetaryRule,
              'late' => $monetaryRule,
              'holding_tax' => $monetaryRule,
              'tax_bal_due' => $monetaryRule,
              'policy_loan' => $monetaryRule,
              'consol_loan' => $monetaryRule,
              'emerg_loan' => $monetaryRule,
              'gel' => $monetaryRule,
              'gfal' => $monetaryRule,
              'mpl' => $monetaryRule,
              'mpl_lite' => $monetaryRule,
              'contributions' => $monetaryRule,
              'loans' => $monetaryRule,
              'housing_loan' => $monetaryRule,
              'cfi' => $monetaryRule,
              'tipid' => $monetaryRule,
              'city_savings_bank' => $monetaryRule,
              'fea' => $monetaryRule,
              'canteen' => $monetaryRule,
              'disallowance' => $monetaryRule,
              'unliquidated_ca' => $monetaryRule,
              'disallowance_honoraria' => $monetaryRule,
              'coop' => $monetaryRule,
              'landbank' => $monetaryRule,
              'ucpb' => $monetaryRule,
       ]);

       $this->payrollService->publish($validated);
      
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
}