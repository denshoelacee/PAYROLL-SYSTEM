<?php

namespace App\Contracts\Services;

use Illuminate\Pagination\LengthAwarePaginator;

interface IEmployeeService{

    public function approveAccount($id);

    public function rejectAccount($id);

    public function pendingUsers();
}