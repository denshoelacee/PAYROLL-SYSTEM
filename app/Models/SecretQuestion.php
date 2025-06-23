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

    public function userQuestionAnswer(){
      
       return $this->belongsTo(User::class);
    }
}
