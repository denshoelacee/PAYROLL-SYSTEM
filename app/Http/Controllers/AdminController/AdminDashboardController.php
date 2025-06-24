<?php

namespace App\Http\Controllers\AdminController;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\Controller;

class AdminDashboardController extends Controller
{
    public function dashboard (){

        return Inertia::render('Admin/Dashboard');
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
