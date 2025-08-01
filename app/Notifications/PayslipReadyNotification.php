<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PayslipReadyNotification extends Notification
{
    use Queueable;

    public $payslip;

    public function __construct($payslip)
    {
        $this->payslip = $payslip;
    }

    
    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    public function toDatabase(object $notifiable)
    {
        return [
            'type' => 'payslip',
            'description' => 'payroll_id',
            'status' => 'markAsUnread'    
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'description' => 'Your Payslip is now available.',
            'status' => 'tae',
        ]);
    }
    public function broadcastType()
    {
        return 'payslip.ready';
    }
    
}
