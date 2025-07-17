<?php

namespace App\Providers;

use App\Contracts\Repository\IContributionTypeRepository;
use App\Contracts\Repository\IPayrollDeductionRepository;
use App\Contracts\Services\IPayrollService;
use App\Repository\ContributionTypeRepository;
use Illuminate\Support\ServiceProvider;
use App\Contracts\Repository\IJobTitleRepository;
use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Repository\ISecretQuestionRepository;
use App\Contracts\Services\IJobTitleService;
use App\Repository\JobTitleRepository;
use App\Services\JobTitleService;
use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\Auth\ICreateNewAccountService;
use App\Contracts\Services\Auth\IEditDeleteAccountService;
use App\Contracts\Services\IBatchApproveAccountService;
use App\Contracts\Services\IDashboardService;
use App\Contracts\Services\IEmployeeService;
use App\Contracts\Services\Auth\IPasswordResetService;
use App\Contracts\Services\IPayrollService\IGeneratePayrollService;
use App\Models\ContributionType;
use App\Repository\PayrollDeductionRepository;
use App\Repository\PayrollRepository;
use App\Repository\SecretQuestionRepository;
use App\Repository\UserRepository;
use App\Services\Auth\CreateNewAccountService;
use App\Services\Auth\EditDeleteAccountService;
use App\Services\BatchApproveAccountService;
use App\Services\DashboardService;
use App\Services\EmployeeService;
use App\Services\Auth\PasswordResetService;
use App\Services\PayrollService;
use App\Services\PayrollService\GeneratePayrollService;

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
        $this->app->bind(IBatchApproveAccountService::class, BatchApproveAccountService::class);
        $this->app->bind(ISecretQuestionRepository::class, SecretQuestionRepository::class);
        $this->app->bind(ICreateNewAccountService::class, CreateNewAccountService::class);
        $this->app->bind(IGeneratePayrollService::class,GeneratePayrollService::class);
        $this->app->bind(IPayrollService::class,PayrollService::class);
        $this->app->bind(IPayrollRepository::class,PayrollRepository::class);
        $this->app->bind(IEditDeleteAccountService::class, EditDeleteAccountService::class);
        $this->app->bind(IContributionTypeRepository::class, ContributionTypeRepository::class);
        $this->app->bind(IPayrollDeductionRepository::class, PayrollDeductionRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
