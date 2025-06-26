<?php

namespace App\Contracts\Repository;

use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface IUserRepository{

    public function getMonthlyUserStats(int $year): Collection;

    public function setApproveAccount($id);

    public function setRejectAccount($id);

    public function getPaginateUsers($perPage);

}