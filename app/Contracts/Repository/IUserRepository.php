<?php

namespace App\Contracts\Repository;

interface IUserRepository{

    public function getMonthlyUserStats(int $year): \Illuminate\Support\Collection;

    public function setApproveAccount($id);

    public function setRejectAccount($id);


}