<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IDashboardService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Payroll;
use Illuminate\Support\Facades\db;
use App\Http\Controllers\Controller;

class AdminDashboardController extends Controller
{
   
    
    public function __construct(protected IDashboardService $dashboardService){}
     

    public function dashboard (){

        $userStatsMonthly = $this->dashboardService->getMonthlyUserStatsService();
        return Inertia::render('Admin/Dashboard',
               $userStatsMonthly
        );
    }

    public function index(Request $request)
    {
    $year = $request->year ?? now()->year;
    $month = $request->month ?? now()->month;

    $payslips = Payroll::join('users', 'payrolls.user_id', '=', 'users.user_id')
        ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')
        ->select([
            'payrolls.created_at as pay_date',
            'users.employee_id as employee_id',
            'users.last_name as last_name',
            'users.first_name as first_name',
            'users.designation as designation',
            'users.department as department',
            'users.employment_type as employment_type',
            'payrolls.publish_status as publish_status',
            'payrolls.basic_salary',
            'payroll_deductions.total_deduction',
            'payroll_deductions.net_pay'
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

   

    return Inertia::render('PayslipIndex', [
        'payslips' => $payslips,
        'availableYears' => range(2025, now()->year),
        'availableMonths' => $months,
        'selectedYear' => (string)$year,
        'selectedMonth' => str_pad($month, 2, '0', STR_PAD_LEFT),
    ]);
}

}
