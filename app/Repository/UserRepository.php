<?php

namespace App\Repository;

use App\Contracts\Repository\IUserRepository;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class UserRepository implements IUserRepository{

        public function getMonthlyUserStats(int $year): \Illuminate\Support\Collection
        {
            return DB::table('users')
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->mapWithKeys(fn($item) => [$item->month => $item->count]);
        }
}