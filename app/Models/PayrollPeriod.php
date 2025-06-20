<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayrollPeriod extends Model
{
    use HasFactory;

    protected $fillable = [

        'payroll_id',
        'start_period',
        'end_period',
        'period_salary'
    ];

    public function payrollPeriodMonthly(){

        return $this->belongsToMany(Payroll::class,'payroll_id','payroll_id');
    }
}
