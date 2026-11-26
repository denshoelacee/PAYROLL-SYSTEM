<?php

namespace App\Providers;

use App\Contracts\Repositories\IContributionTypeRepository;
use App\Contracts\Repositories\IHrMetaDataRepository;
use App\Contracts\Repositories\IPayrollDeductionRepository;
use App\Contracts\Repositories\IPayrollRepository;
use App\Contracts\Repositories\ISecretQuestionRepository;
use App\Contracts\Repositories\IUserRepository;
use App\Contracts\Services\Account\IBatchDecisionService;
use App\Contracts\Services\Account\ICreateAccountService;
use App\Contracts\Services\Account\IEditDeleteAccountService;
use App\Contracts\Services\Auth\IPasswordResetService;
use App\Contracts\Services\IDashboardService;
use App\Contracts\Services\IEmployeeService;
use App\Contracts\Services\IHrMetaDataService;
use App\Contracts\Services\Payroll\IPayrollService;
use App\Contracts\Services\Reports\IEmployeePayslipReportService;
use App\Contracts\Services\Reports\IPayrollReportService;
use App\Contracts\Services\Reports\IPayslipReportService;
use App\Repositories\ContributionTypeRepository;
use App\Repositories\HrMetaDataRepository;
use App\Repositories\PayrollDeductionRepository;
use App\Repositories\PayrollRepository;
use App\Repositories\SecretQuestionRepository;
use App\Repositories\UserRepository;
use App\Services\Account\BatchDecisionService;
use App\Services\Account\CreateAccountService;
use App\Services\Account\EditDeleteAccountService;
use App\Services\Auth\PasswordResetService;
use App\Services\DashboardService;
use App\Services\EmployeeService;
use App\Services\HrMetaDataService;
use App\Services\Payroll\PayrollService;
use App\Services\Reports\EmployeePayslipReportService;
use App\Services\Reports\PayrollReportService;
use App\Services\Reports\PayslipReportService;
use Illuminate\Support\ServiceProvider;

class DependencyInjectionProvider extends ServiceProvider
{
    /**
     * Interface => implementation bindings, resolved as singletons.
     *
     * @var array<class-string, class-string>
     */
    public array $singletons = [
        // Repositories
        IContributionTypeRepository::class => ContributionTypeRepository::class,
        IHrMetaDataRepository::class => HrMetaDataRepository::class,
        IPayrollDeductionRepository::class => PayrollDeductionRepository::class,
        IPayrollRepository::class => PayrollRepository::class,
        ISecretQuestionRepository::class => SecretQuestionRepository::class,
        IUserRepository::class => UserRepository::class,

        // Services
        IBatchDecisionService::class => BatchDecisionService::class,
        ICreateAccountService::class => CreateAccountService::class,
        IEditDeleteAccountService::class => EditDeleteAccountService::class,
        IPasswordResetService::class => PasswordResetService::class,
        IDashboardService::class => DashboardService::class,
        IEmployeeService::class => EmployeeService::class,
        IHrMetaDataService::class => HrMetaDataService::class,
        IPayrollService::class => PayrollService::class,
        IEmployeePayslipReportService::class => EmployeePayslipReportService::class,
        IPayrollReportService::class => PayrollReportService::class,
        IPayslipReportService::class => PayslipReportService::class,
    ];
}
