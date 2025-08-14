<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;



class NewUserApprovalNotification extends Notification
{
    use Queueable;


    public function __construct(public $newUser){}

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'user_id' => $this->newUser->user_id,
            'full_name' => $this->newUser->last_name . ', ' . $this->newUser->first_name,
            'registerMessage' => 'registered! Needs approval.',
        ];

    }
}
