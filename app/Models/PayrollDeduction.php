<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayrollDeduction extends Model
{
    use HasFactory;

    protected $primaryKey = 'payroll_deduction_id';

    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [

        'payroll_id',
        'total_accrued_period',
        'total_deduction',
        'net_pay'
    ];

    //Belongs to Payroll Model
    public function payroll(){
        
        return $this->belongsTo(Payroll::class,'payroll_id');
    }
}
