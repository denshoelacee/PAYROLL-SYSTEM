<?php

namespace App\Contracts\Services;

use Illuminate\Pagination\LengthAwarePaginator;

interface EmployeeServiceInterface{

    public function approveAccount($id);

    public function rejectAccount($id);

    public function pendingUsers();

    public function employeeList();
}
