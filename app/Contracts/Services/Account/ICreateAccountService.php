<?php

namespace App\Contracts\Services\Account;

use Illuminate\Http\Request;

interface ICreateAccountService
{

    public function register(Request $request):void;
}