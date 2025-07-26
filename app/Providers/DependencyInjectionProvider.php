<?php

namespace App\Providers;

use App\Contracts\Repository\IContributionTypeRepository;
use App\Contracts\Repository\IEmploymentTypeRepository;
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
use App\Contracts\Services\IPayrollReportsServices\IGeneratePayrollsReportService;
use App\Contracts\Services\IPayrollReportsServices\IGeneratePayslipsReportService;
use App\Repository\EmploymentTypeRepository;
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
use App\Services\PayrollReportsServices\GeneratePayrollsReportService;
use App\Services\PayrollReportsServices\GeneratePayslipsReportService;
use App\Services\PayrollService;

class DependencyInjectionProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(IJobTitleRepository::class,JobTitleRepository::class);
        $this->app->singleton(IEmploymentTypeRepository::class, EmploymentTypeRepository::class);
        $this->app->singleton(IJobTitleService::class,JobTitleService::class);

        $this->app->singleton(IUserRepository::class, UserRepository::class);
        $this->app->singleton(IDashboardService::class, DashboardService::class);
        $this->app->singleton(IEmployeeService::class, EmployeeService::class);
        $this->app->singleton(IPasswordResetService::class, PasswordResetService::class);
        $this->app->singleton(IBatchApproveAccountService::class, BatchApproveAccountService::class);
        $this->app->singleton(ISecretQuestionRepository::class, SecretQuestionRepository::class);
        $this->app->singleton(ICreateNewAccountService::class, CreateNewAccountService::class);
        $this->app->singleton(IPayrollService::class,PayrollService::class);
        $this->app->singleton(IPayrollRepository::class,PayrollRepository::class);
        $this->app->singleton(IEditDeleteAccountService::class, EditDeleteAccountService::class);
        $this->app->singleton(IContributionTypeRepository::class, ContributionTypeRepository::class);
        $this->app->singleton(IPayrollDeductionRepository::class, PayrollDeductionRepository::class);
        $this->app->singleton(IGeneratePayslipsReportService::class, GeneratePayslipsReportService::class);
        $this->app->singleton(IGeneratePayrollsReportService::class, GeneratePayrollsReportService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
