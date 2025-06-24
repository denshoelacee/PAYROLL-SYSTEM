<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\Repository\IJobTitleRepository;
use App\Contracts\Services\IJobTitleService;
use App\Repository\JobTitleRepository;
use App\Services\JobTitleService;

class DependencyInjectionProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(IJobTitleRepository::class,JobTitleRepository::class);
        $this->app->singleton(IJobTitleService::class,JobTitleService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
