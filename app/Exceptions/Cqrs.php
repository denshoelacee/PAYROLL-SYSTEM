<?php 

namespace App\Exceptions;

use Inertia\Inertia;
use Illuminate\Support\Facades\Config;

    Inertia::share([
        'sogema' => Config::get('sogema'),
    ]);
