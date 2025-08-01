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
        $user = User::with('answerQuestion')->where('employee_id', $validateReset['employee_id'])->first();

        if (!$user) {
            return null;
        }

        return $user;
    }

    public function findById(int $id): ?User
    {
       return User::find($id);
    }

    public function executeBatchDecission(array $user_ids, string $checker): int
    {  
        if (empty($user_ids)) {
            return 0;
        }

        $statusMap = [
            'toApproved' => 'verified',
            'toRejected' => 'rejected',
        ];

        if (!isset($statusMap[$checker])) {
            return 0;
        }

        return User::whereIn('user_id', $user_ids)
               ->update(['status' => $statusMap[$checker]]);
    }
    
    public function batchDeleteAccount(array $user_ids):int
    {
        if (empty($user_ids)) {
            return 0;
        }

        return User::whereIn('user_id', $user_ids)->delete();
    }
    public function create(array $data): User
    {
        $user = new User($data);
        $user->save();

        return $user;
    }

    public function countUserPending()
    {
        return User::where('status', 'pending')->count();
    }
}