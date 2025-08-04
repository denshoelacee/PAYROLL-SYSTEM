<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class NewPayrollNotification extends Notification
{
    use Queueable;

  
    protected $payslip;

    public function __construct($payslip)
    {
        $this->payslip = $payslip;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'payroll_id' => $this->payslip->payroll_id,
            'month' => date('F') . ' ' . date('Y'),
        ];
    }
}