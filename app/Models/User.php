<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Payroll;

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

    public function payrolls(){

        return $this->hasMany(Payroll::class,'user_id','user_id');
    }

    public function AnswerQuestion(){

        return $this->hasMany(SecretQuestion::class,'user_id','user_id');
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
