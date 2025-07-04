<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController\AdminEmployeeController;
use App\Http\Controllers\BatchProcessingController\BatchApproveController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Route::post('/testing',[PasswordResetLinkController::class,'store']);

Route::post('/admin/users/batch-approve', [BatchApproveController::class, 'batchApprove'])->name('admin.users.batch-approve');
