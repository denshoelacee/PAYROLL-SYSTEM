<?php

namespace App\Providers;

use App\Contracts\Repository\PayrollReportsRepositoryInterface;
use App\Repository\PayrollReportsRepository;
use Illuminate\Support\ServiceProvider;

// Repositories
use App\Contracts\Repository\ContributionTypeRepositoryInterface;
use App\Contracts\Repository\HrMetaDataRepositoryInterface;
use App\Contracts\Repository\PayrollDeductionRepositoryInterface;
use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Repository\SecretQuestionRepositoryInterface;
use App\Contracts\Repository\UserRepositoryInterface;
use App\Repository\ContributionTypeRepository;
use App\Repository\HrMetaDataRepository;
use App\Repository\PayrollDeductionRepository;
use App\Repository\PayrollRepository;
use App\Repository\SecretQuestionRepository;
use App\Repository\UserRepository;

class DependencyInjectionProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Repository Bindings
        $this->app->bind(ContributionTypeRepositoryInterface::class, ContributionTypeRepository::class);
        $this->app->bind(HrMetaDataRepositoryInterface::class, HrMetaDataRepository::class);
        $this->app->bind(PayrollDeductionRepositoryInterface::class, PayrollDeductionRepository::class);
        $this->app->bind(PayrollRepositoryInterface::class, PayrollRepository::class);
        $this->app->bind(SecretQuestionRepositoryInterface::class, SecretQuestionRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(PayrollReportsRepositoryInterface::class, PayrollReportsRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
