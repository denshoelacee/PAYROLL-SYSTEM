<?php

namespace App\Contracts\Services\Auth;

use Illuminate\Http\Request;

interface CreateNewAccountServiceInterface
{

    public function register(Request $request):void;
}
