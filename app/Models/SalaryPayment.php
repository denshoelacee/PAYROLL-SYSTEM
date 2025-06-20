<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaryPayment extends Model
{
    use HasFactory;

    protected $fillable = [

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
        'year',
        'month'
       
    ];
}
