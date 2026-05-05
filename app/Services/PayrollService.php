<?php

namespace App\Services;

use App\Contracts\Repository\ContributionTypeRepositoryInterface;
use App\Contracts\Repository\PayrollRepositoryInterface;
use App\Contracts\Services\PayrollServiceInterface;
use App\Contracts\Repository\UserRepositoryInterface;
use App\Contracts\Repository\PayrollDeductionRepositoryInterface;
use App\Events\PayslipEvent;
use App\Notifications\NewPayrollNotification;
use App\Traits\JobWorkPayrollAssigned;
use App\Traits\PayrollContributionDeduction;
use App\Traits\PayrollDeduction;
use App\Traits\PayslipIdGenerator;


class PayrollService
{

    use PayslipIdGenerator;
    use JobWorkPayrollAssigned;
    use PayrollDeduction;
    use PayrollContributionDeduction;

    public function __construct(
                   protected PayrollRepositoryInterface          $payrollRepository,
                   protected UserRepositoryInterface             $userRepository,
                   protected ContributionTypeRepositoryInterface $contributionTypeRepository,
                   protected PayrollDeductionRepositoryInterface $payrollDeductionRepository
    ){}

    public function usersWithoutPayrollForCurrentMonth($id,$type)
    {
         $selectedType = ucwords($type, " \t\r\n\f\v|"); 

        return $this->payrollRepository->getUsersWithoutPayrollForCurrentMonth($id,$selectedType);
        
    }

    
    public function selectEmploymentSalaryType($employmentType)
    {
        
        return $this->payrollRepository->getSelectEmploymentSalaryType($employmentType);
        
    }

    public function updatePayslipById(string $payslip_id,string $type)
    {

       return $this->payrollRepository->getUpdatePayslipById($payslip_id,$type);

    }

    public function storePartial(array $data)
    {
        //dd($data);
        $user = $this->userRepository->findById($data['user_id']);
           $salary = $user->basic_pay;

        $jobAssigned = $this->jobWorkAssigned(
            $data['user_id'],
            $data['employment_type'],
            $data['assigned_designation'],
            $data['assigned_department']
        );

        $generateId = $this->generatePayslipId(
            $data['user_id'],
            $data['employment_type']
        );
        
          if (!$user){
            throw new \Exception('User not found');
          }

    $totalContribution = $data['rlip'] + $data['philhealth'];

         $payData = $this->calculateSalaryAndDeduction($user, $data, $totalContribution);

       $data['payslip_id'] = $generateId['id'];
       $data['payslip_type'] = $generateId['type'];
      //  $data['rlip'] = $contribution['rlip'];      
      //  $data['philhealth'] = $contribution['philhealth'];
       $data['basic_salary'] = $salary;
       $data['assigned_designation'] = $jobAssigned['designation'];
       $data['assigned_department'] = $jobAssigned['department'];
       $data['publish_status'] = 'partial';


       $payroll = $this->payrollRepository->setPayrollModel($data);
       $payroll->deduction()->create([
            'total_accrued_period' => $payData['grossPay'],
            'total_deduction' => $payData['totalDeduction'],
            'net_pay' => $payData['netPay']
       ]);

    }

    public function publish(array $data):void
    {
        // dd($data);

         $user = $this->userRepository->findById($data['user_id']);
          $salary = $user->basic_pay;

         $jobAssigned = $this->jobWorkAssigned(
            $data['user_id'],
            $data['employment_type'],
            $data['assigned_designation'],
            $data['assigned_department']
        );

         $generateId = $this->generatePayslipId(
            $data['user_id'],
            $data['employment_type']
          );

          if (!$user){
            throw new \Exception('User not found');
          }
          // $contribution = $this->calculateContributionDeduction($salary, $data['employment_type']);
        
         $payData = $this->calculateSalaryAndDeduction($user, $data);

       $data['payslip_id'] = $generateId['id'];
       $data['payslip_type'] = $generateId['type'];
      //  $data['rlip'] = $contribution['rlip'];      
      //  $data['philhealth'] = $contribution['philhealth'];
       $data['basic_salary'] = $salary;
       $data['assigned_designation'] = $jobAssigned['designation'];
       $data['assigned_department'] = $jobAssigned['department'];
       $data['publish_status'] = 'publish';

       $payroll = $this->payrollRepository->setPayrollModel($data);

       $payroll->deduction()->create([
            'total_accrued_period' => $payData['grossPay'],
            'total_deduction' => $payData['totalDeduction'],
            'net_pay' => $payData['netPay']
       ]);

      //         event(new PayslipEvent($user->user_id,$payroll));
      //  $user->notify(new NewPayrollNotification($payroll));

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

