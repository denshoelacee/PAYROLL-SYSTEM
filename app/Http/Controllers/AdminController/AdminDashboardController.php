<?php

namespace App\Http\Controllers\AdminController;

use App\Contracts\Services\IDashboardService;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\Controller;

class AdminDashboardController extends Controller
{
   
    
    public function __construct(protected IDashboardService $dashboardService){}
     

    public function dashboard (){

        $userStatsMonthly = $this->dashboardService->getMonthlyUserStatsService();
        return Inertia::render('Admin/Dashboard',
               $userStatsMonthly
        );
        dd($userStatsMonthly);
    }

    
    public function payroll (){

        return Inertia::render('Admin/Payroll');
    }
}
