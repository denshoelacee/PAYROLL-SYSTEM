<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\Services\HrMetaDataServiceInterface;
use App\Events\registerEvent;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\NewUserApprovalNotification;
use App\Notifications\NewUserNeedsApproval;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;


class RegisteredUserController extends Controller
{

    public function __construct(protected HrMetaDataServiceInterface $metaDataService,){}

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $data = $this->metaDataService->jobTitleList();
        $empTypeList = $this->metaDataService->empTypeList();


            return Inertia::render('Auth/Register',
                ['Jobtitles' => $data,
                'employeeTypeList' => $empTypeList]

            );
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'employee_id'     => 'required|integer',
            'last_name'       => 'required|string|max:50',
            'first_name'      => 'required|string|max:50',
            'designation'     => 'required|string|max:50',
            'department'      => 'required|string|max:50',
            'basic_pay'       => 'nullable|numeric',
            'password'        => ['required', 'confirmed', Rules\Password::min(8)->numbers()->symbols(),],
            'employment_type' => 'required|string|max:50',
            'secret_question' => 'required|string|max:100',
            'secret_answer'   => 'required|string|max:50',
        ]);

        $request->merge([
            'last_name'  => ucwords(strtolower($request->last_name)),
            'first_name' => ucwords(strtolower($request->first_name)),
        ]);

       try
        {
            $user = User::create([
                'employee_id'    => ucwords($request['employee_id']),
                'last_name'      => ucwords($request['last_name']),
                'first_name'     => $request->first_name,
                'designation'    => $request->designation,
                'department'     => $request->department,
                'basic_pay'      => $request->basic_pay,
                'password'       => Hash::make($request['password']),
                'employment_type'=> $request->employment_type,
            ]);
            $user->answerQuestion()->create([
                'secret_question' => $request->secret_question,
                'secret_answer'   => Hash::make(strtolower(trim($request->secret_answer)))
            ]);

             $hrUsers = User::where('role', 'Admin')->get();

            //foreach ($hrUsers as $hrUser) {
            //$hrUser->notify(new NewUserApprovalNotification($user));
            //}

            //event(new registerEvent($user));
            return redirect()->route('login')->with('information','Register successfully, Please wait for approval.');

        }
       catch(\Exception $e)
       {

            return redirect()->back()->with('error','Something went wrong. Please try again later.');

       }


    }
}
