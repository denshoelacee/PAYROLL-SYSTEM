<?php

namespace App\Repository;

use App\Contracts\Repository\IPayrollRepository;
use Illuminate\Support\Facades\DB;
use App\Models\Payroll;
use App\Models\User;
use Carbon\Carbon;

class PayrollRepository implements IPayrollRepository{

    public function getTotalNetpayMonth()
    {
         $totalNetPay = DB::table('payrolls')
            ->selectRaw('SUM(net_pay) as total_net_pay')
            ->whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->value('total_net_pay') ?? 0;
    }

    public function setPayrollModel(array $data):Payroll
    {
        return Payroll::create($data);
    }

    public function getPayrollThisMonth()
    {
        
       return Payroll::with(['user', 'previousPayroll'])
                    ->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->get();
    }

    public function getUsersWithoutPayrollForCurrentMonth()
    {
         $startOfMonth = Carbon::now()->startOfMonth();
         $endOfMonth = Carbon::now()->endOfMonth();

        return User::whereDoesntHave('payrolls', function ($query) use ($startOfMonth, $endOfMonth) {
                        $query->whereBetween('created_at', [$startOfMonth, $endOfMonth]);})
                        ->with(['latestPayroll'])
                        ->get();
    }
    
}