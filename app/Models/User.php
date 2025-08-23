<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Payroll;
use App\Models\UserEmploymentRole;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

   
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $primaryKey = 'user_id';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'employee_id',
        'last_name',
        'first_name',
        'designation',
        'department',
        'basic_pay',
        'password',
        'employment_type',
        'status',
        'role'
    ];

    public function roles(){

        return $this->hasMany(UserEmploymentRole::class, 'user_id');
    }

    public function payrolls(){

        return $this->hasMany(Payroll::class,'user_id','user_id');
    }

    public function answerQuestion(){

        return $this->hasOne(SecretQuestion::class,'user_id','user_id');
    }

    public function latestPayroll(){

        return $this->hasOne(Payroll::class, 'user_id', 'user_id')
                    ->latest('created_at');
    }

    public function latestEmploymentRole(){

        return $this->hasOne(UserEmploymentRole::class, 'user_id')
                    ->latest('created_at');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];
}
