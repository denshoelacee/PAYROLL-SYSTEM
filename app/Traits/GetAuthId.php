<?php

namespace App\Traits;

trait GetAuthId
{

    public function getAuthUserId()
    {

        return auth()->id();
        
    }
}