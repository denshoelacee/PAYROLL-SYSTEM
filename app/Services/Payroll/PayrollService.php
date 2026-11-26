<?php

namespace App\Services\Payroll;

use App\Contracts\Repositories\IContributionTypeRepository;
use App\Contracts\Repositories\IPayrollRepository;
use App\Contracts\Repositories\IUserRepository;
use App\Contracts\Services\Payroll\IPayrollService;
use App\Events\PayslipEvent;
use App\Models\Payroll;
use App\Models\User;
use App\Notifications\NewPayrollNotification;

class PayrollService implements IPayrollService
{
    public function __construct(
        protected IPayrollRepository $payrollRepo,
        protected IUserRepository $userRepository,
        protected IContributionTypeRepository $contributionTypeRepo,
        protected PayrollCalculator $calculator
    ) {}

    public function payrollThisMonth()
    {
        return $this->payrollRepo->getPayrollThisMonth();
    }

    public function usersWithoutPayrollForCurrentMonth()
    {
        return $this->payrollRepo->getUsersWithoutPayrollForCurrentMonth();
    }

    public function storePartial(array $data): void
    {
        $this->createPayroll($this->findUser($data['user_id']), $data, 'partial');
    }

    public function publish(array $data): void
    {
        $user = $this->findUser($data['user_id']);
        $payroll = $this->createPayroll($user, $data, 'publish');

        event(new PayslipEvent($user->user_id, $payroll));
        $user->notify(new NewPayrollNotification($payroll));
    }

    public function editedPartialPublishPayroll(array $data, $id): void
    {
        if ($data['publish_status'] === 'publish') {
            $result = $this->calculate($this->findUser($data['user_id']), $data);
            $this->payrollRepo->updatePublish($id, $result['payroll'], $result['deduction']);
        }

        if ($data['publish_status'] === 'partial') {
            $this->payrollRepo->updatePartial($data, $id);
        }
    }

    private function createPayroll(User $user, array $data, string $status): Payroll
    {
        $result = $this->calculate($user, $data);
        $result['payroll']['publish_status'] = $status;

        $payroll = $this->payrollRepo->setPayrollModel($result['payroll']);
        $payroll->deduction()->create($result['deduction']);

        return $payroll;
    }

    private function calculate(User $user, array $data): array
    {
        return $this->calculator->calculate(
            $user->basic_pay,
            $this->contributionTypeRepo->getContribution(),
            $data
        );
    }

    private function findUser($id): User
    {
        $user = $this->userRepository->findById($id);

        if (!$user) {
            throw new \Exception('User not found');
        }

        return $user;
    }
}
