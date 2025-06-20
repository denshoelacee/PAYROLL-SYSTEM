<?php

namespace App\Services;

use App\Contracts\Services\InterfaceUserServices;

class UserService implements InterfaceUserServices{

    public function user(){
        return "Hello User";
    }
}