<?php

use App\Http\Controllers\Admin\BatchDecisionController;
use App\Http\Controllers\Admin\CreateAccountController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EditDeleteAccountController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\MetaDataController;
use App\Http\Controllers\Admin\PayrollController;
use App\Http\Controllers\Admin\PayrollReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Loaded by the RouteServiceProvider with the "web", "auth" and
| "role:Admin" middleware, the "/admin" URI prefix and the "admin." name prefix.
|
*/

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

// Employees & account approval
Route::get('/employee', [EmployeeController::class, 'employee'])->name('employee');
Route::post('/approve/{id}', [EmployeeController::class, 'approve'])->name('approve');
Route::post('/reject/{id}', [EmployeeController::class, 'reject'])->name('reject');

Route::post('/pending/accounts/batch-approve', [BatchDecisionController::class, 'batchApprove'])->name('users.batch-approve');
Route::post('/pending/accounts/batch-reject', [BatchDecisionController::class, 'batchReject'])->name('users.batch-reject');
Route::post('/pending/accounts/batch-delete', [BatchDecisionController::class, 'batchDelete'])->name('users.batch-delete');

// Accounts
Route::post('/added-user', [CreateAccountController::class, 'store'])->name('accounts.store');
Route::patch('/account/update/{id}', [EditDeleteAccountController::class, 'editAccount'])->name('accounts.update');
Route::delete('/account/delete/{id}', [EditDeleteAccountController::class, 'deleteAccount'])->name('accounts.destroy');

// HR metadata (departments, positions, employment types, contributions)
Route::get('/department', [MetaDataController::class, 'displayEmpTypeList'])->name('department');
Route::post('/department/contribution/create', [MetaDataController::class, 'store'])->name('contributions.store');

Route::post('/addEmploymentType', [MetaDataController::class, 'createEmploymentType'])->name('employment-types.store');
Route::post('/editEmploymentType/{id}', [MetaDataController::class, 'updateEmploymentType'])->name('employment-types.update');
Route::delete('/deleteEmploymentType/{id}', [MetaDataController::class, 'deleteEmploymentType'])->name('employment-types.destroy');

Route::post('/createPositions', [MetaDataController::class, 'createPositions'])->name('positions.store');
Route::post('/updatePositions/{id}', [MetaDataController::class, 'updateJobTitle'])->name('positions.update');
Route::delete('/deletePositions/{id}', [MetaDataController::class, 'deleteJobTitle'])->name('positions.destroy');

// Payroll
Route::get('/payroll', [PayrollController::class, 'payrollThisDay'])->name('payroll');
Route::post('/payroll/store', [PayrollController::class, 'savePartial'])->name('payroll.store-partial');
Route::post('/payroll/publish', [PayrollController::class, 'publish'])->name('payroll.publish');
Route::post('/payroll/updatePartialPublish/{id}', [PayrollController::class, 'editedPartialPublish'])->name('payroll.update-partial-publish');
Route::get('/payroll/Payslip/{id}', fn () => Inertia::render('Admin/ViewPayslip'))->name('payslip.show');

// Reports
Route::get('/reports/summary', [PayrollReportController::class, 'payrollReportsYearly'])->name('reports.summary');
Route::get('/reports/payroll/{year}/{month}/view/summary', [PayrollReportController::class, 'payrollReportsYearlyView'])->name('reports.show');
