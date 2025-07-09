<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecretQuestion extends Model
{
    use HasFactory;

    protected $fillable = [

        'user_id',
        'secret_question',
        'secret_answer'
    ];

    //Belongs to User Model
    public function userQuestionAnswer(){
      
       return $this->belongsTo(User::class,'user_id','user_id');
    }
}
