<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminController extends Controller
{
    public function dashboard (){

        return Inertia::render('Admin/Dashboard');
    }

    public function employee (){

        return Inertia::render('Admin/Employee');
    }

    public function payroll (){

        return Inertia::render('Admin/Payroll');
    }
}
