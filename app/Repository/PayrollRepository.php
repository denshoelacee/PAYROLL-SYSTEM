<?php

namespace App\Repository;

use App\Contracts\Repository\IContributionTypeRepository;
use App\Contracts\Repository\IPayrollDeductionRepository;
use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Repository\IUserRepository;
use Illuminate\Support\Facades\DB;
use App\Models\Payroll;
use App\Models\User;
use Carbon\Carbon;

class PayrollRepository implements IPayrollRepository{
    
    public function __construct(
        protected IUserRepository $userRepository,
        protected IPayrollDeductionRepository $payrollDeductionRepo,
        protected IContributionTypeRepository $contributionTypeRepo

    ){}

    public function getTotalNetpayMonth()
    {
         $totalNetPay = DB::table('payrolls')
            ->selectRaw('SUM(net_pay) as total_net_pay')
            ->whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->value('total_net_pay') ?? 0;
    }

    public function setPayrollModel(array $data):Payroll
    {
        return $payroll = Payroll::create($data);
    }

    public function getPayrollThisMonth()
    {
        
       return Payroll::with(['user', 'previousPayroll'])
                    ->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->get();
    }

    public function getUsersWithoutPayrollForCurrentMonth()
    {
         $startOfMonth = Carbon::now()->startOfMonth();
         $endOfMonth = Carbon::now()->endOfMonth();

        return User::whereDoesntHave('payrolls', function ($query) use ($startOfMonth, $endOfMonth) {
                        $query->whereBetween('created_at', [$startOfMonth, $endOfMonth]);})
                        ->with(['latestPayroll'])
                        ->get();
    }  

    public function payrollModel(int $id): ?Payroll
    {
        return Payroll::findOrFail($id);
    }

    public function updatePartial(array $data,$id): void
    {
       $payroll = $this->payrollModel($id);
       $payroll->update($data);
    }

    public function updatePublish(array $data,$id): void
    {

        $user = $this->userRepository->findById($data['user_id']);
        $salary = $user->basic_pay;

          $rlipContribution = $this->contributionTypeRepo->rlipDeduction($salary);
          $philContribution = $this->contributionTypeRepo->philDeduction($salary);
          $totalContribution = $rlipContribution + $philContribution;

          $totalAccruedPeriod = $salary + ($data['pera'] ?? 0);
          $totalDeduction = $this->payrollDeductionRepo->calculateTotalDeduction($data,$totalContribution);
          $netPay = $totalAccruedPeriod - $totalDeduction;

           $data['rlip'] = $rlipContribution;
           $data['philhealth'] = $philContribution;
           $data['basic_salary'] = $salary;

        $payroll = $this->payrollModel($id);
        $payroll->deduction()->create([
            'total_accrued_period' => $totalAccruedPeriod,
            'total_deduction' => $totalDeduction,
            'net_pay' => $netPay
       ]);
       $payroll->update($data);
    }
}