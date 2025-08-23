<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEmploymentRole extends Model
{
    use HasFactory;

    protected $primaryKey = 'role_id';

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'type',
        'designation',
        'department'
    ];

    public function user(){

        return $this->belongsTo(User::class, 'user_id');
    }

    public function payrolls(){

        return $this->hasMany(Payroll::class, 'role_id');
    }

}
