<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IDashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\Controller;

class AdminDashboardController extends Controller
{
    private $dashboardService;
    
    public function __construct(IDashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }
     

    public function dashboard (){

        $userStatsMonthly = $this->dashboardService->getMonthlyUserStatsService();
        return Inertia::render('Admin/Dashboard',
               $userStatsMonthly
        );
        //dd($userStatsMonthly);
    }

    public function employee (){
        
        $users = User::select('employee_id', 'first_name', 'last_name', 'designation' ,'department','employment_type','role')->get();
        return Inertia::render(
            'Admin/Employee',
            ['employees' => $users]
        );
    }

    public function payroll (){

        return Inertia::render('Admin/Payroll');
    }
}
