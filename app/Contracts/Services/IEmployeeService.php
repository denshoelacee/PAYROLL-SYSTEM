<?php

namespace App\Contracts\Services;

interface IEmployeeService{

    public function approveAccount($id);

    public function rejectAccount($id);
}