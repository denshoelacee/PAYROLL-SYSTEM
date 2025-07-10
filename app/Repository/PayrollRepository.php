<?php

namespace App\Repository;

use App\Contracts\Repository\IPayrollRepository;
use Illuminate\Support\Facades\DB;
use App\Models\Payroll;


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
                    ->whereIn('publish_status', ['none', 'partial'])
                    ->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->get();
    }
}