<?php

namespace App\Services\Auth;

use App\Contracts\Repository\ISecretQuestionRepository;
use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\Auth\ICreateNewAccountService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CreateNewAccountService implements ICreateNewAccountService
{

      public function __construct(
           protected IUserRepository $userRepo,
           protected ISecretQuestionRepository $secretQuestionRepo
      ){}


      public function register(Request $request):void
      {     
          $user = $this->userRepo->create([
              'employee_id' => $request->employee_id,
              'last_name'   => $request->last_name,
              'first_name'  => $request->first_name,
              'department'  => $request->department,
              'designation' => $request->designation,
              'employment_type' => $request->employment_type,
              'basic_pay' => $request->basic_pay,
              'password'  => Hash::make($request['employee_id']),
              'status' => ($request['verified']),
              'role'   => $request->role 
          ]);

          $request->merge([
              'last_name'  => ucwords(strtolower($request->last_name)),
              'first_name' => ucwords(strtolower($request->first_name))
          ]);

          $user->secretQuestionRepo->registerSecretQuestion($user,[
              'secret_question' => ($request['default']),
              'secret_answer'   => Hash::make(strtolower(trim($request['employee_id'])))
          ]);
      }
}