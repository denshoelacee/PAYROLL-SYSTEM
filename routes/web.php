<?php

use App\Http\Controllers\AdminController\AdminDashboardController;
use App\Http\Controllers\AdminController\AdminEmployeeController;
use App\Http\Controllers\Auth\PasswordResetConfirmControlller;
use App\Http\Controllers\EmployeeController\EmployeeDashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::fallback(function () {
    return Inertia::render('Errors/Error419');
});

Route::fallback(function () {
    return Inertia::render('Errors/Error404');
});

Route::get('/dashboard', function () {
    $user = Auth::user();

    return redirect()->intended(
                $user->role === 'admin' ? '/admin/dashboard' : '/employee/dashboard'
            );
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {  
    Route::get('/dashboard', [AdminDashboardController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/employee', [AdminEmployeeController::class, 'employee'])->name('admin.employee');
    Route::get('/payroll', [AdminDashboardController::class, 'payroll'])->name('admin.payroll');
    Route::post('/approve/{id}', [AdminEmployeeController::class, 'approve'])->name('admin.approve');
    Route::post('/reject/{id}', [AdminEmployeeController::class, 'reject'])->name('admin.reject');
    Route::get('/payroll/Payslip', function () {
        return Inertia::render('Admin/ViewPayslip');
    });

});

Route::prefix('employee')->middleware(['auth', 'role:user'])->group(function () {
    Route::get('/dashboard', [EmployeeDashboardController::class, 'dashboard'])->name('employee.dashboard');
    
});

Route::middleware(['auth', 'role:admin,user'])->group(function () {
    // shared routes or can access admin,user
});

require __DIR__.'/auth.php';
