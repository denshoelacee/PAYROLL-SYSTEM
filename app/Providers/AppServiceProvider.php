<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
          Inertia::share('dev', fn () => config('sogema'));

          // Share a secure hash of the team JSON
          Inertia::share('team_hash', fn () => hash('sha256', json_encode(config('team.members'))));
    }
}
