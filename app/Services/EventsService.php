<?php

namespace App\Services;

use App\Contracts\Repository\UserRepositoryInterface;
use App\Contracts\Services\EventsServiceInterface;

class EventsService implements EventsServiceInterface
{
    public function __construct(protected UserRepositoryInterface $userRepository){}


    public function getCountPendingAccount()
    {
        return $this->userRepository->getPendingUsers();
    }
}
