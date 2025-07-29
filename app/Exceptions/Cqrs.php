<?php 

namespace App\Exceptions;

use Inertia\Inertia;
use Illuminate\Support\Facades\Config;

    Inertia::share([
        'reverb1' => Config::get('reverb1'),
    ]);
