<?php

namespace App\Contracts\Services\Auth;

use Illuminate\Http\Request;

interface ICreateNewAccountService
{

    public function register(Request $request):void;
}