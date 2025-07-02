<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    
    public function render($request, Throwable $exception)
{
    if ($exception instanceof NotFoundHttpException && $request->expectsJson() === false) {
        return Inertia::render('Errors/Error419')->toResponse($request)->setStatusCode(404);
    }

     if ($exception instanceof HttpException && $exception->getStatusCode() === 419) {
        return Inertia::render('Errors/419')->toResponse($request)->setStatusCode(419);
    }

    return parent::render($request, $exception);
}


}
