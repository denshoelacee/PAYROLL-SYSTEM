<?php

namespace App\Repository;

use App\Contracts\Repository\IPayrollRepository;
use App\Models\DeductionType;
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

  
    public function setMonthlyPayroll()
    {
        return DeductionType::SELECT('');
    }
}