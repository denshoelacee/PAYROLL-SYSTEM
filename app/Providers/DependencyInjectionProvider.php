<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class DependencyInjectionProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton('');
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
