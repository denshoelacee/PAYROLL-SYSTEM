<?php

namespace App\Services;

use App\Contracts\Repository\IContributionTypeRepository;
use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Services\IPayrollService;
use App\Contracts\Repository\IUserRepository;
use App\Contracts\Repository\IPayrollDeductionRepository;

class PayrollService implements IPayrollService
{

    public function __construct(
                   protected IPayrollRepository $payrollRepo,
                   protected IUserRepository $userRepository,
                   protected IContributionTypeRepository $contributionTypeRepo,
                   protected IPayrollDeductionRepository $payrollDeductionRepo
    ){}

    public function payrollThisMonth()
    {
        return $this->payrollRepo->getPayrollThisMonth();
    }

    public function usersWithoutPayrollForCurrentMonth()
    {
        return $this->payrollRepo->getUsersWithoutPayrollForCurrentMonth();
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


       $payroll = $this->payrollRepo->setPayrollModel($data);
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


       $payroll = $this->payrollRepo->setPayrollModel($data);
       $payroll->deduction()->create([
            'total_accrued_period' => $totalAccruedPeriod,
            'total_deduction' => $totalDeduction,
            'net_pay' => $netPay
       ]);
    }

    public function editedPartialPublishPayroll(array $data,$id):void
    {
         if($data['publish_status'] === 'publish'){
            $this->payrollRepo->updatePublish($data,$id);
         }
         if($data['publish_status'] === 'partial')
         {
           $this->payrollRepo->updatePartial($data,$id);
         }

    }

}