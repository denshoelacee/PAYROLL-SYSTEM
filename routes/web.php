<?php

use App\Http\Controllers\AdminController\AdminDashboardController;
use App\Http\Controllers\AdminController\AdminEmployeeController;
use App\Http\Controllers\AdminController\AdminPayrollController;
use App\Http\Controllers\AdminController\AdminPayrollReportsController;
use App\Http\Controllers\AdminController\AdminMetaDataController;
use App\Http\Controllers\Auth\CreateNewAccountController;
use App\Http\Controllers\Auth\EditDeleteAccountController;
use App\Http\Controllers\BatchProcessingController\BatchApproveController;
use App\Http\Controllers\EmployeeController\EmployeeDashboardController;
use App\Http\Controllers\EmployeeController\EmployeeReportsController;
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

Route::post('/admin/users/batch-approve', [BatchApproveController::class, 'batchApprove'])->name('admin.users.batch-approve');

Route::get('/dashboard', function () {
    $user = Auth::user();

    return redirect()->intended(
                $user->role === 'Admin' ? '/admin/dashboard' : '/employee/dashboard'
            );
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::delete('/account/delete/{id}',[EditDeleteAccountController::class, 'deleteAccount'])->name('delete.account');
    Route::patch('/account/update/{id}', [EditDeleteAccountController::class, 'editAccount'])->name('update.account');
});

Route::prefix('admin')->middleware(['auth', 'role:Admin'])->group(function () {  
    Route::get('/dashboard', [AdminDashboardController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/employee', [AdminEmployeeController::class, 'employee'])->name('admin.employee');
    Route::get('/payroll', [AdminPayrollController::class, 'payrollThisDay'])->name('admin.payroll');
    Route::post('/added-user',[CreateNewAccountController::class,'store'])->name('add.new.account');
    Route::post('/approve/{id}', [AdminEmployeeController::class, 'approve'])->name('admin.approve');
    Route::post('/reject/{id}', [AdminEmployeeController::class, 'reject'])->name('admin.reject');
    Route::delete('/account/delete/{id}',[EditDeleteAccountController::class, 'deleteAccount'])->name('delete.account');
    Route::patch('/account/update/{id}', [EditDeleteAccountController::class, 'editAccount'])->name('update.account');
    Route::post('/payroll/store', [AdminPayrollController::class, 'savePartial'])->name('admin.store.partial');
    Route::post('/payroll/publish', [AdminPayrollController::class, 'publish'])->name('admin.store.publish');
    Route::post('/payroll/updatePartialPublish/{id}', [AdminPayrollController::class, 'editedPartialPublish'])->name('admin.payroll.update-partial-publish');
    Route::get('/reports/summary',[AdminPayrollReportsController::class,'payrollReportsYearly'])->name('admin.payroll.summary');
    Route::get('/reports/payroll/{year}/{month}/view/summary',[AdminPayrollReportsController::class,'payrollReportsYearlyView'])->name('admin.payroll.view.summary');
    Route::get('/department',[AdminMetaDataController::class,'displayEmpTypeList'])->name('admin.department');
    Route::post('/addEmploymentType', [AdminMetaDataController::class, 'createEmploymentType'])->name('adminAdd.EmploymentType');
    Route::post('editEmploymentType/{id}', [AdminMetaDataController::class, 'updateEmploymentType'])->name('adminUpdate.EmploymentType');
    Route::delete('deleteEmploymentType/{id}', [AdminMetaDataController::class, 'deleteEmploymentType'])->name('adminDelete.EmploymentType');

    //Admin MetaData Controller
    Route::post('/createPositions', [AdminMetaDataController::class, 'createPositions'])->name('admin.create.positions');
    Route::post('/updatePositions/{id}', [AdminMetaDataController::class, 'updateJobTitle'])->name('admin.update.position');
    Route::delete('deletePositions/{id}', [AdminMetaDataController::class, 'deleteJobTitle'])->name('admin.delete.position');


    Route::get('/payroll/Payslip/{id}', function () {
        return Inertia::render('Admin/ViewPayslip');
    });
    


    /**Route::get('/reports', function () {
        return Inertia::render('Admin/Reports');
    })->name('admin.reports'); */
});

Route::prefix('employee')->middleware(['auth', 'role:User'])->group(function () {
    Route::get('/dashboard', [EmployeeDashboardController::class, 'dashboard'])->name('employee.dashboard');
    Route::get('/payslip/summary',[EmployeeReportsController::class,'userPayslipReports'])->name('employee.payslipsummary');
    Route::get('/payslip/reports/{year}/summary',[EmployeeReportsController::class,'userPayslipReports'])->name('employee.payslip.reports');
    
    Route::get('/payroll/Payslip/{id}', function () {
        return Inertia::render('Employee/ViewPayslip');
    });
});

Route::middleware(['auth', 'role:Admin,User'])->group(function () {
    // shared routes or can access admin,user
});

require __DIR__.'/auth.php';
