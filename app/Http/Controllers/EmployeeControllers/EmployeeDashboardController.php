<?php

namespace App\Http\Controllers\EmployeeController;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class EmployeeDashboardController extends Controller
{
    public function dashboard (){

        return Inertia::render('Employee/Dashboard');
    }
}
