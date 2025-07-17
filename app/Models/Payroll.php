<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;

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
        'contributions',
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
        'publish_status'
        
    ];

    //Belongs to User Model
    public function user(){

        return $this->belongsTo(User::class,'user_id','user_id');
    }

    //Has one to PayrollDeduction Model
    public function deduction(){

        return $this->hasOne(PayrollDeduction::class, 'payroll_id');
    }

    public function previousPayroll()
    {
    return $this->hasOne(self::class, 'user_id', 'user_id')
        ->whereMonth('created_at', Carbon::now()->subMonth()->month)
        ->whereYear('created_at', Carbon::now()->subMonth()->year)
        ->latest('created_at');
    }
}
