<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PayslipEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    
    public $userId;
    public $payroll;

    public function __construct($userId, $payroll)
    {
        $this->userId = $userId;
        $this->payroll = $payroll;
    }

 
    public function broadcastOn()
    {
        return [
            new PrivateChannel('App.Models.User.' . $this->userId),
        ];
    }

    public function broadcastAs()
    {
        return 'PayslipPublished';
    }

    public function broadcastWith(): array
{
    return [
        'payroll' => $this->payroll
    ];
}
}
