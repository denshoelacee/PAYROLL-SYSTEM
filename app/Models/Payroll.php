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
        'basic_salary',
        'pera',
        'absent',
        'late',
        'holding_tax',
        'tax_bal_due',
        'rlip',
        'policy_loan',
        'consol_loan',
        'emerg_loan',
        'gel',
        'gfal',
        'mpl',
        'mpl_lite',
        'contribution',
        'loans',
        'housing_loan',
        'philhealth',
        'cfi',
        'tipid',
        'city_savings_bank',
        'fea',
        'canteen',
        'disallowance',
        'unliquidated_ca',
        'disallowance_honoraria',
        'coop',
        'landbank',
        'ucpb',
        
    ];

    //Belongs to User Model
    public function users(){

        return $this->belongsTo(User::class,'user_id','user_id');
    }

    //Has one to PayrollDeduction Model
    public function deductions(){

        return $this->hasOne(PayrollDeduction::class, 'payroll_id');
    }
}
