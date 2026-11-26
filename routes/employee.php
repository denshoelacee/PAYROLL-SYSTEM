<?php

use App\Http\Controllers\Employee\DashboardController;
use App\Http\Controllers\Employee\PayslipReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Employee Routes
|--------------------------------------------------------------------------
|
| Loaded by the RouteServiceProvider with the "web", "auth" and
| "role:User" middleware, the "/employee" URI prefix and the "employee." name prefix.
|
*/

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
Route::get('/payslip/summary', [PayslipReportController::class, 'userPayslipReports'])->name('payslip.summary');
Route::get('/payslip/reports/{year}/summary', [PayslipReportController::class, 'userPayslipReports'])->name('payslip.reports');
Route::get('/payroll/Payslip/{id}', fn () => Inertia::render('Employee/ViewPayslip'))->name('payslip.show');
