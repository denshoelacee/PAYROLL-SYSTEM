<?php

namespace App\Services;

use App\Contracts\Repository\ContributionTypeRepositoryInterface;
use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Services\PayrollServiceInterface;
use App\Contracts\Repository\UserRepositoryInterface;
use App\Contracts\Repository\PayrollDeductionRepositoryInterface;
use App\Events\PayslipEvent;
use App\Notifications\NewPayrollNotification;
use App\Traits\Hashable;


class PayrollService implements PayrollServiceInterface
{

    use Hashable;
    public function __construct(
                   protected PayrollRepositoryInterface          $payrollRepository,
                   protected UserRepositoryInterface             $userRepository,
                   protected ContributionTypeRepositoryInterface $contributionTypeRepo,
                   protected PayrollDeductionRepositoryInterface $payrollDeductionRepo
    ){}

    public function usersWithoutPayrollForCurrentMonth($id)
    {
        return $this->payrollRepository->getUsersWithoutPayrollForCurrentMonth($id);
    }

    
    public function selectEmploymentSalaryType($employmentType)
    {
        
        return $this->payrollRepository->getSelectEmploymentSalaryType($employmentType);
        
    }

    public function storePartial(array $data)
    {
        $user = $this->userRepository->findById($data["user_id"]);
         $salary = $user->basic_pay;

         $rlipContribution = $this->contributionTypeRepo->rlipDeduction($salary);
         $philContribution = $this->contributionTypeRepo->philDeduction($salary);

         $totalContribution = $rlipContribution + $philContribution;
         $totalAccruedPeriod = $salary + ($data['pera'] ?? 0);
         $totalDeduction = $this->payrollDeductionRepo->calculateTotalDeduction($data,$totalContribution);

         $netPay = $totalAccruedPeriod - $totalDeduction;

           if (!$user){
            throw new \Exception('User not found');
          }


       $data['rlip'] = $rlipContribution;
       $data['philhealth'] = $philContribution;
       $data['basic_salary'] = $salary;
       $data['publish_status'] = 'partial';


       $payroll = $this->payrollRepository->setPayrollModel($data);
       $payroll->deduction()->create([
            'total_accrued_period' => $totalAccruedPeriod,
            'total_deduction' => $totalDeduction,
            'net_pay' => $netPay
       ]);

    }

    public function publish(array $data):void
    {
         $user = $this->userRepository->findById($data['user_id']);
         $salary = $user->basic_pay;

         $rlipContribution = $this->contributionTypeRepo->rlipDeduction($salary);
         $philContribution = $this->contributionTypeRepo->philDeduction($salary);

         $totalContribution = $rlipContribution + $philContribution;
         $totalAccruedPeriod = $salary + ($data['pera'] ?? 0);
         $totalDeduction = $this->payrollDeductionRepo->calculateTotalDeduction($data,$totalContribution);

         $netPay = $totalAccruedPeriod - $totalDeduction;

           if (!$user){
            throw new \Exception('User not found');
          }


       $data['rlip'] = $rlipContribution;
       $data['philhealth'] = $philContribution;
       $data['basic_salary'] = $salary;
       $data['publish_status'] = 'publish';

       $payroll = $this->payrollRepository->setPayrollModel($data);

       $payroll->deduction()->create([
            'total_accrued_period' => $totalAccruedPeriod,
            'total_deduction' => $totalDeduction,
            'net_pay' => $netPay
       ]);

              event(new PayslipEvent($user->user_id,$payroll));
       $user->notify(new NewPayrollNotification($payroll));

    }

    public function editedPartialPublishPayroll(array $data,$id):void
    {
         if($data['publish_status'] === 'publish'){
            $this->payrollRepository->updatePublish($data,$id);
         }
         if($data['publish_status'] === 'partial')
         {
           $this->payrollRepository->updatePartial($data,$id);
         }

    }

}
