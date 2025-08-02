<?php

use App\Http\Controllers\AdminController\AdminDashboardController;
use App\Http\Controllers\AdminController\AdminEmployeeController;
use App\Http\Controllers\AdminController\AdminPayrollController;
use App\Http\Controllers\AdminController\AdminPayrollReportsController;
use App\Http\Controllers\AdminController\AdminMetaDataController;
use App\Http\Controllers\Auth\CreateNewAccountController;
use App\Http\Controllers\Auth\EditDeleteAccountController;
use App\Http\Controllers\BatchProcessingController\BatchDecissionController;
use App\Http\Controllers\EmployeeController\EmployeeDashboardController;
use App\Http\Controllers\EmployeeController\EmployeeReportsController;
use Illuminate\Support\Facades\Route;
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

Route::prefix('admin')->middleware(['auth', 'role:Admin'])->group(function () {

    //Admin Dashboard Controller
    Route::get('/dashboard', [AdminDashboardController::class, 'dashboard'])->name('admin.dashboard');

    //Admin Employee Controller
    Route::get('/employee', [AdminEmployeeController::class, 'employee'])->name('admin.employee');
    Route::post('/approve/{id}', [AdminEmployeeController::class, 'approve'])->name('admin.approve');
    Route::post('/reject/{id}', [AdminEmployeeController::class, 'reject'])->name('admin.reject');

    //Admin MetaData Controller
    Route::post('/addEmploymentType', [AdminMetaDataController::class, 'createEmploymentType'])->name('adminAdd.EmploymentType');
    Route::post('editEmploymentType/{id}', [AdminMetaDataController::class, 'updateEmploymentType'])->name('adminUpdate.EmploymentType');
    Route::delete('deleteEmploymentType/{id}', [AdminMetaDataController::class, 'deleteEmploymentType'])->name('adminDelete.EmploymentType');
    Route::post('/createPositions', [AdminMetaDataController::class, 'createPositions'])->name('admin.create.positions');
    Route::post('/updatePositions/{id}', [AdminMetaDataController::class, 'updateJobTitle'])->name('admin.update.position');
    Route::delete('deletePositions/{id}', [AdminMetaDataController::class, 'deleteJobTitle'])->name('admin.delete.position');
    Route::get('/department',[AdminMetaDataController::class,'displayEmpTypeList'])->name('admin.department');

    //Batch Processing Controller
    Route::post('/pending/accounts/batch-approve',[BatchDecissionController::class, 'batchApprove'])->name('admin.users.batch-approve');
    Route::post('/pending/accounts/batch-reject', [BatchDecissionController::class, 'batchReject'])->name('admin.users.batch-reject');
    Route::post('/pending/accounts/batch-delete', [BatchDecissionController::class, 'batchDelete'])->name('admin.users.batch-delete');

    //Admin Payroll Controller
    Route::get('/payroll', [AdminPayrollController::class, 'payrollThisDay'])->name('admin.payroll');
    Route::post('/payroll/store', [AdminPayrollController::class, 'savePartial'])->name('admin.store.partial');
    Route::post('/payroll/publish', [AdminPayrollController::class, 'publish'])->name('admin.store.publish');
    Route::post('/payroll/updatePartialPublish/{id}', [AdminPayrollController::class, 'editedPartialPublish'])->name('admin.payroll.update-partial-publish');
    Route::get('/reports/summary',[AdminPayrollReportsController::class,'payrollReportsYearly'])->name('admin.payroll.summary');
    Route::get('/reports/payroll/{year}/{month}/view/summary',[AdminPayrollReportsController::class,'payrollReportsYearlyView'])->name('admin.payroll.view.summary');

    //Admin Actions Controller
    Route::post('/added-user',[CreateNewAccountController::class,'store'])->name('add.new.account');
    Route::delete('/account/delete/{id}',[EditDeleteAccountController::class, 'deleteAccount'])->name('delete.account');
    Route::patch('/account/update/{id}', [EditDeleteAccountController::class, 'editAccount'])->name('update.account');

    Route::get('/payroll/Payslip/{id}', function () {
        return Inertia::render('Admin/ViewPayslip');
    });
});

Route::prefix('employee')->middleware(['auth', 'role:User'])->group(function () {
    Route::get('/dashboard', [EmployeeDashboardController::class, 'dashboard'])->name('employee.dashboard');
    Route::get('/payslip/summary',[EmployeeReportsController::class,'userPayslipReports'])->name('employee.payslip.summary');
    Route::get('/payslip/reports/{year}/summary',[EmployeeReportsController::class,'userPayslipReports'])->name('employee.payslip.reports');

    Route::get('/payroll/Payslip/{id}', function () {
        return Inertia::render('Employee/ViewPayslip');
    });
});

Route::middleware(['auth', 'role:Admin,User'])->group(function () {
    // shared routes or can access admin,user
});

require __DIR__.'/auth.php';
