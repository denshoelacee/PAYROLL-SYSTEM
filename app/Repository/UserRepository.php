<?php

namespace App\Repository;

use App\Contracts\Repository\IUserRepository;
use Illuminate\Pagination\LengthAwarePaginator;
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

     public function setApproveAccount($id)
     {
        $user = User::findOrFail($id);
        $user->status = 'verified';
        return $user->save();
     }

     public function setRejectAccount($id)
     {
        $user = User::findOrFail($id);
        $user->status = 'rejected';
        return $user->save();
     }

     public function getPaginateUsers($perPage)
     {
         return User::SELECT('users.*')
                   ->orderBy('created_at','desc')
                   ->paginate($perPage)
                   ->withQueryString();
     }

}