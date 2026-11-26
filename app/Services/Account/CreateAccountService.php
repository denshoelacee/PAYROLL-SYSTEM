<?php

namespace App\Services\Account;

use App\Contracts\Repositories\ISecretQuestionRepository;
use App\Contracts\Repositories\IUserRepository;
use App\Contracts\Services\Account\ICreateAccountService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CreateAccountService implements ICreateAccountService
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
              'status' => 'verified',
              'role'   => $request->role 
          ]);

          $request->merge([
              'last_name'  => ucwords(strtolower($request->last_name)),
              'first_name' => ucwords(strtolower($request->first_name))
          ]);

          /*$user->secretQuestionRepo->registerSecretQuestion($user,[
              'secret_question' => 'default',
              'secret_answer'   => Hash::make('asda')
          ]);*/
      }
}