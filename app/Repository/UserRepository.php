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

     public function getPendingUsers()
     {
         return User::SELECT('user_id','employee_id','last_name','first_name','designation','department','employment_type')
                    ->WHERE('status','pending')
                    ->orderBy('created_at','desc')
                    ->get(10);
    }

    public function getEmployeeList()
    {
        return User::SELECT('user_id','employee_id','last_name','first_name','designation','department','basic_pay','employment_type','status','role')
                   ->get();
    }

    public function getResetPassword($validateReset)
    {
       $user = User::where('employee_id', $validateReset['employee_id'])->first();

        if (!$user) {
            return null;
        }

        $match = $user->answerQuestion()
                    ->where('secret_question', $validateReset['secret_question'])
                    ->first();

        return $match;
    }
}