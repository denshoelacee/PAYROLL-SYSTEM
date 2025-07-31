<?php

namespace App\Services;

use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IEventsService;

class EventsService implements IEventsService
{
    public function __construct(protected IUserRepository $userReposiotry){}


    public function getCountPendingAccount()
    {
        return $this->userReposiotry->getPendingUsers();
    }
}