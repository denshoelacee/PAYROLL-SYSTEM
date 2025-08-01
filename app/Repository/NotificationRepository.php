<?php

namespace App\Repository;

use App\Models\Notification;

class NotificationRepository
{
      
    public function getNotification($id)
    {
      return $notifications = Notification::where('$notifiable_id',$id)
        ->select('type',
                 'notifiable_id',
                 'year',
                 'month',
                 'status',
                 'created_at')
            ->orderBy("created_at","asc")
            ->get();
    }
}