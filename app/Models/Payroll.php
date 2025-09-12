<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;
use App\Traits\PayrollIdGenerator;

class Payroll extends Model
{
    use HasFactory,Notifiable;

    protected $primaryKey = 'payroll_id';
    public $incrementing = true; 
    protected $keyType = 'int';
    
    protected $fillable = [

        'payslip_id',
        'user_id',
        'basic_salary',
        'daily_rate',
        'hourly_rate',
        'duty_count',
        'service_rendered',
        'units',
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
        'sss',
        'deduction1',
        'deduction2',
        'deduction3',
        'assigned_designation',
        'assigned_department',
        'payslip_type',
        'publish_status'
        
    ];

    

    public function user(){

        return $this->belongsTo(User::class,'user_id','user_id');
    }

    //Has one to PayrollDeduction Model
    public function deduction(){

        return $this->hasOne(PayrollDeduction::class, 'payroll_id');
    }

    public function notifications(){

         return $this->morphMany(Notification::class, 'notifiable');
    }

    public function previousPayroll()
    {
    return $this->hasOne(self::class, 'user_id', 'user_id')
        ->whereMonth('created_at', Carbon::now()->subMonth()->month)
        ->whereYear('created_at', Carbon::now()->subMonth()->year)
        ->latest('created_at');
    }
        protected $casts = [
        'basic_salary' => 'float',
        'daily_rate' => 'float',
        'duty_count' => 'float',
        'service_rendered' => 'float',
        'units' => 'float',
        'pera' => 'float',
        'absent' => 'float',
        'late' => 'float',
        'holding_tax' => 'float',
        'tax_bal_due' => 'float',
        'rlip' => 'float',
        'policy_loan' => 'float',
        'consol_loan' => 'float',
        'emerg_loan' => 'float',
        'gel' => 'float',
        'gfal' => 'float',
        'mpl' => 'float',
        'mpl_lite' => 'float',
        'contributions' => 'float',
        'loans' => 'float',
        'housing_loan' => 'float',
        'philhealth' => 'float',
        'cfi' => 'float',
        'tipid' => 'float',
        'city_savings_bank' => 'float',
        'fea' => 'float',
        'canteen' => 'float',
        'disallowance' => 'float',
        'unliquidated_ca' => 'float',
        'disallowance_honoraria' => 'float',
        'coop' => 'float',
        'landbank' => 'float',
        'ucpb' => 'float',
        'sss' => 'float',
        'deduction1' => 'float',
        'deduction2' => 'float',
        'deduction3' => 'float',
    ];
}
