<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{userId}', function ($user, $userId) {
    return (int) auth()->id() === (int) $userId;
});
Broadcast::channel('hr.notifications', function ($user) {
    return $user->role === 'Admin';
});

