<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IPayrollService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Payroll;

class AdminPayrollController extends Controller
{

       public function __construct(protected IPayrollService $payrollService){}
      
    public function storePayroll(Request $request)
    {
          $validated = $request->validate([
            'user_id'  => 'exists:users,user_id',
            'basic_pay' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'pera' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'absent' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'late' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'holding_tax' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'tax_bal_due' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'policy_loan' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'consol_loan' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'emerg_loan' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'gel' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'gfal' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'mpl' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'mpl_lite' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'contributions' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'loans' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'housing_loan' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'cfi' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'tipid' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'city_savings_bank' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'fea' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'canteen' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'disallowance' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'unliquidated_ca' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'disallowance_honoraria' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'coop' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'landbank' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'ucpb' => ['nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
          ]);

          
     
    }

    public function payrollThisDay()
    {
      $thisMonth = $this->payrollService->payrollThisMonth();

      $newPayroll = $this->payrollService->usersWithoutPayrollForCurrentMonth();

      /* $startOfMonth = Carbon::now()->startOfMonth();
       $endOfMonth = Carbon::now()->endOfMonth();

         $newPayroll = User::whereDoesntHave('payrolls', function ($query) use ($startOfMonth, $endOfMonth) {
                $query->whereBetween('created_at', [$startOfMonth, $endOfMonth]);
                })->get();
      
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $newPayroll = User::whereDoesntHave('payrolls', function ($query) use ($startOfMonth, $endOfMonth) {
               $query->whereBetween('created_at', [$startOfMonth, $endOfMonth]);
        })
        ->with(['latestPayroll']) // custom relation below
        ->get();
        */
      dd($newPayroll);
      return Inertia::render(
                           'Admin/Payroll',
                           ['thisMonth' => $thisMonth,
                            'newPayroll' => $newPayroll
                           ]
      );
    }
}