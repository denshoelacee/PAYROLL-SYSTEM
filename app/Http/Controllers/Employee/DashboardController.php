<?php

namespace App\Http\Controllers\Employee;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function dashboard (){

        return Inertia::render('Employee/Dashboard');
    }
}
