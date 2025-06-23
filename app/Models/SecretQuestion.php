<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecretQuestion extends Model
{
    use HasFactory;

    protected $fillable = [

        'user_id',
        'question',
        'secret_ans'
    ];

    public function userQuestionAnswer(){
      
       return $this->belongsTo(User::class);
    }
}
