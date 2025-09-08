<?php

namespace App\Providers;

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

// Services
use App\Contracts\Services\Auth\CreateNewAccountServiceInterface;
use App\Contracts\Services\Auth\EditDeleteAccountServiceInterface;
use App\Contracts\Services\Auth\ExecuteBatchDecisionServiceInterface;
use App\Contracts\Services\Auth\PasswordResetServiceInterface;
use App\Contracts\Services\Auth\SecretQAServiceInterface;
use App\Contracts\Services\DashboardServiceInterface;
use App\Contracts\Services\EmployeeServiceInterface;
use App\Contracts\Services\EventsServiceInterface;
use App\Contracts\Services\HrMetaDataServiceInterface;
use App\Contracts\Services\IEmployeeServices\PayslipReportsServicesInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayrollsReportServiceInterface;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayslipsReportServiceInterface;
use App\Contracts\Services\PayrollServiceInterface;
use App\Services\Auth\CreateNewAccountService;
use App\Services\Auth\EditDeleteAccountService;
use App\Services\Auth\ExecuteBatchDecisionService;
use App\Services\Auth\PasswordResetService;
use App\Services\Auth\SecretQAService;
use App\Services\DashboardService;
use App\Services\EmployeeService;
use App\Services\EventsService;
use App\Services\HrMetaDataService;
use App\Services\EmployeeServices\PayslipReportsService;
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
        // Repository Bindings
        $this->app->bind(ContributionTypeRepositoryInterface::class, ContributionTypeRepository::class);
        $this->app->bind(HrMetaDataRepositoryInterface::class, HrMetaDataRepository::class);
        $this->app->bind(PayrollDeductionRepositoryInterface::class, PayrollDeductionRepository::class);
        $this->app->bind(PayrollRepositoryInterface::class, PayrollRepository::class);
        $this->app->bind(SecretQuestionRepositoryInterface::class, SecretQuestionRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);

        // Service Bindings
        $this->app->bind(DashboardServiceInterface::class, DashboardService::class);
        $this->app->bind(EmployeeServiceInterface::class, EmployeeService::class);
        $this->app->bind(PasswordResetServiceInterface::class, PasswordResetService::class);
        $this->app->bind(SecretQAServiceInterface::class, SecretQAService::class);
        $this->app->bind(ExecuteBatchDecisionServiceInterface::class, ExecuteBatchDecisionService::class);
        $this->app->bind(CreateNewAccountServiceInterface::class, CreateNewAccountService::class);
        $this->app->bind(PayrollServiceInterface::class, PayrollService::class);
        $this->app->bind(EditDeleteAccountServiceInterface::class, EditDeleteAccountService::class);
        $this->app->bind(GeneratePayslipsReportServiceInterface::class, GeneratePayslipsReportService::class);
        $this->app->bind(GeneratePayrollsReportServiceInterface::class, GeneratePayrollsReportService::class);
        $this->app->bind(EventsServiceInterface::class, EventsService::class);
        $this->app->bind(HrMetaDataServiceInterface::class, HrMetaDataService::class);
        $this->app->bind(PayslipReportsServicesInterface::class, PayslipReportsService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
