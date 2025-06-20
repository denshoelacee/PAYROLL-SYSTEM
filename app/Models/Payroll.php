<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Payroll extends Model
{
    use HasFactory,Notifiable;

    protected $fillable = [

        'user_id',
        'basic_pay',
        'pera',
        'total_accrued_period',
        'net_pay',
    ];

    public function users(){

        return $this->belongsTo(User::class,'user_id','user_id');
    }

    public function periods(){

        return $this->hasMany(PayrollPeriod::class,'payroll_id','payroll_id');
    }
  
    public function deductions(){

        return $this->hasMany(PayrollDeduction::class, 'payroll_id', 'payroll_id');
    }
}
