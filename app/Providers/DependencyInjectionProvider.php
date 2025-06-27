<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\Repository\IJobTitleRepository;
use App\Contracts\Services\IJobTitleService;
use App\Repository\JobTitleRepository;
use App\Services\JobTitleService;
use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IDashboardService;
use App\Contracts\Services\IEmployeeService;
use App\Contracts\Services\IPasswordResetService;
use App\Repository\UserRepository;
use App\Services\DashboardService;
use App\Services\EmployeeService;
use App\Services\PasswordResetService;

class DependencyInjectionProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(IJobTitleRepository::class,JobTitleRepository::class);
        $this->app->singleton(IJobTitleService::class,JobTitleService::class);

        $this->app->bind(IUserRepository::class, UserRepository::class);
        $this->app->bind(IDashboardService::class, DashboardService::class);
        $this->app->singleton(IEmployeeService::class, EmployeeService::class);
        $this->app->singleton(IPasswordResetService::class, PasswordResetService::class);

    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
