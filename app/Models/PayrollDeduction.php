<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayrollDeduction extends Model
{
    use HasFactory;

    protected $fillable = [

        'payroll_deduction',
        'deduction_type_id',
        'total_deduction',
    ];

    public function payrollDeduction(){
        
        return $this->belongsTo(Payroll::class, 'payroll_id', 'payroll_id');
    }

    public function deductionType(){

        return $this->belongsToMany(DeductionType::class,'deduction_type_id','deduction_type_id');
    }
}
