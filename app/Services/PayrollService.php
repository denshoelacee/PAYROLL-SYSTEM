<?php

namespace App\Services;

use App\Contracts\Repository\IContributionTypeRepository;
use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Services\IPayrollService;
use App\Contracts\Repository\IUserRepository;

class PayrollService implements IPayrollService
{

    public function __construct(
                   protected IPayrollRepository $payrollRepo,
                   protected IUserRepository $userRepository,
                   protected IContributionTypeRepository $contributionTypeRepo
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

         if (!$user){
            throw new \Exception('User not found');
          }

       $data['basic_salary'] = $user->basic_pay;
       $data['publish_status'] = 'partial';

       return $this->payrollRepo->setPayrollModel($data);

    }

    public function publish(array $data)
    {
         $user = $this->userRepository->findById($data['user_id']);
         $salary = $user->basic_pay;

         $rlipContribution = $this->contributionTypeRepo->rlipDeduction($salary);
         $philContribution = $this->contributionTypeRepo->philDeduction($salary);


           if (!$user){
            throw new \Exception('User not found');
          }
       
       $data['rlip'] = $rlipContribution;
       $data['philhealth'] = $philContribution;
       $data['basic_salary'] = $salary;
       $data['publish_status'] = 'publish';

       return $this->payrollRepo->setPayrollModel($data);

    }
}