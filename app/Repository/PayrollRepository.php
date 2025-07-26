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
        return Payroll::where('payroll_id', $id)->firstOrFail();

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
        $payroll->deduction()->update([
            'total_accrued_period' => $totalAccruedPeriod,
            'total_deduction' => $totalDeduction,
            'net_pay' => $netPay
       ]);
       $payroll->update($data);
    }

    public function getUserPayrollMonthly($year, $month)
    {
         return  Payroll::join('users', 'payrolls.user_id', '=', 'users.user_id')
                        ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')
            ->select([
                'users.user_id',
                'users.employee_id as employee_id',
                'users.last_name as last_name',
                'users.first_name as first_name',
                'users.designation as designation',
                'users.department as department',
                'users.employment_type as employment_type',
                'users.basic_pay',
                'payrolls.*',
                'payroll_deductions.*'
            ])
            ->whereMonth('payrolls.created_at', $month)
            ->whereYear('payrolls.created_at', $year)
            ->get();

    }

    public function getPayrollReportsYearly($year)
    {
        return DB::table('payrolls')
        ->join('payroll_deductions', 'payrolls.payroll_id', '=', 'payroll_deductions.payroll_id')

        ->selectRaw('
            MONTH(payrolls.created_at) as month,
            SUM(payroll_deductions.total_accrued_period) as total_gross,
            SUM(payroll_deductions.total_deduction) as total_deduction,
            SUM(payroll_deductions.net_pay) as net_pay
        ')
        ->where('publish_status','publish')
        ->whereYear('payrolls.created_at', $year)
        ->groupBy(DB::raw('MONTH(payrolls.created_at)'))
        ->orderBy('month')
        ->get()
        ->map(function ($item) {
            $item->month_name = \Carbon\Carbon::create()->month($item->month)->format('F');
            $item->total_gross = (float) $item->total_gross;
            $item->total_deduction = (float) $item->total_deduction;
            $item->net_pay = (float) $item->net_pay;
            
            return $item;
        });
    }
}