<?php

namespace App\Repository;

use App\Contracts\Repository\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class UserRepository implements UserRepositoryInterface{

   
    public function findById(int $id): ?User
    {
 
        return User::findorFail($id);

    }
    
    public function setApproveAccount($userId)
    {

        $user = $this->findById($userId);
        $user->status = 'verified';
        return $user->save();

    }

    public function setRejectAccount($userId)
     {

        $user = $this->findById($userId);
        $user->status = 'rejected';
        return $user->save();

    }

     public function getPendingUsers()
     {
         return User::select(
                'user_id',
                'employee_id',
                'last_name',
                'first_name',
                'designation',
                'department',
                'employment_type')
            ->where('status','pending')
            ->orderBy('created_at','desc')
            ->get(10);
    }

    public function findRoleDetailsById($id)
    {

        return User::select(
                'designation',
                'department',
                'employment_type'
              )
              ->where('user_id', $id)
              ->firstorFail();

    }

    public function findEmploymeeIdAndEmployementTypeById($id)
    {

        return User::select(
            'employee_id',
            'employment_type'
          )
          ->where('user_id', $id)
          ->firstOrFail();
    }

    public function getEmployeeList()
    {
        return User::SELECT(
            'user_id',
            'employee_id',
            'last_name',
            'first_name',
            'designation',
            'department',
            'basic_pay',
            'employment_type',
            'status',
            'role'
            )->where('status','verified')
            ->get();
    }

    public function getResetPassword($validateReset)
    {
        $user = User::with('answerQuestion')
                  ->where('employee_id', $validateReset['employee_id'])
                  ->first();

        if (!$user) {
            return null;
        }

        return $user;
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

    public function countUser()
    {
        return DB::table('users')->count();
    }
}
