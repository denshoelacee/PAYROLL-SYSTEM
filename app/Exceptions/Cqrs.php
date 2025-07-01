<?php 

namespace App\Exceptions;

use Inertia\Inertia;
use Illuminate\Support\Facades\Config;

    Inertia::share([
        'reverb' => Config::get('reverb'),
    ]);
