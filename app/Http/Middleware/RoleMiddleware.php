<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

    if (!in_array($user?->role, $roles)) {
        // Redirect based on role if not authorized
        switch ($user?->role) {
            case 'Admin':
                return redirect()->route('admin.dashboard');
            case 'User':
                return redirect()->route('employee.dashboard');
            default:
                return redirect()->route('login'); 
        }
    }
        return $next($request);
    }
}
