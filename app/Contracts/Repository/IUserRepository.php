<?php

namespace App\Contracts\Repository;

use App\Models\User;
use Illuminate\Support\Collection;

interface IUserRepository{

    public function getMonthlyUserStats(int $year): Collection;

    public function setApproveAccount($id);

    public function setRejectAccount($id);

    public function getPendingUsers();

    public function getEmployeeList();

    public function getResetPassword($validateReset);

    public function batchApproveAccount(array $user_ids):int;

    public function create(array $data):User;

    public function findById(int $id): ?User;
}