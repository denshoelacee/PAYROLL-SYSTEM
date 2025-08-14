<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartTimePayroll extends Model
{
    use HasFactory;

    protected $primaryKey = 'pt_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'employment',
        'rate',
        'rate',
        'units',
        'service_rendered',
        'total_accrued',
        'absent_no_pay',
        'deduction_due_absent_tardiness',
        'pt_gross_pay'
    ];

    public function ptUser(){

        return $this->belongsTo(User::class,'user_id','user_id');
    }
}
