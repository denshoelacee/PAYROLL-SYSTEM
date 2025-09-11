<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\EmploymentType;
use App\Models\JobTitle;
use App\Models\PartTimePayroll;
use App\Models\Payroll;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
     $users = [
    // Regular employees
    [
        'employee_id' => 3220231,
        'last_name' => 'Admin',
        'first_name' => 'Super',
        'designation' => 'System Admin',
        'department' => 'IT',
        'basic_pay' => 50000,
        'employment_type' => 'Regular',
        'password' => Hash::make('admin123'),
        'status' => 'verified',
        'role' => 'Admin',
    ],
    [
        'employee_id' => 3220232,
        'last_name' => 'Cruz',
        'first_name' => 'Maria',
        'designation' => 'HR Officer',
        'department' => 'HR',
        'basic_pay' => 40000,
        'employment_type' => 'Regular',
        'password' => Hash::make('maria123'),
        'status' => 'verified',
        'role' => 'User',
    ],

    // Job Order employees
    [
        'employee_id' => 3220233,
        'last_name' => 'Doe',
        'first_name' => 'John',
        'designation' => 'Developer',
        'department' => 'IT',
        'basic_pay' => 35000,
        'employment_type' => 'Job Order',
        'password' => Hash::make('john123'),
        'status' => 'verified',
        'role' => 'Admin',
    ],
    [
        'employee_id' => 3220234,
        'last_name' => 'Lee',
        'first_name' => 'Kevin',
        'designation' => 'Graphic Designer',
        'department' => 'Marketing',
        'basic_pay' => 30000,
        'employment_type' => 'Job Order',
        'password' => Hash::make('kevin123'),
        'status' => 'verified',
        'role' => 'Admin',
    ],

    // Part-Time employees
    [
        'employee_id' => 3220235,
        'last_name' => 'Smith',
        'first_name' => 'Jane',
        'designation' => 'Instructor I',
        'department' => 'COT',
        'basic_pay' => 20000,
        'employment_type' => 'Part-Time',
        'password' => Hash::make('jane123'),
        'status' => 'verified',
        'role' => 'Admin',
    ],
    [
        'employee_id' => 3220236,
        'last_name' => 'Torres',
        'first_name' => 'Angela',
        'designation' => 'Assistant Instructor',
        'department' => 'COE',
        'basic_pay' => 18000,
        'employment_type' => 'Part-Time',
        'password' => Hash::make('angela123'),
        'status' => 'verified',
        'role' => 'Admin',
    ],
];



foreach ($users as $user) {
    User::create($user);
}  

$EmploymentTypes =[
 ['employment_type_list' => 'Regular'],['employment_type_list' => 'Job Order'],['employment_type_list' => 'Part-Time']
];
foreach($EmploymentTypes as $employmentType) {
 EmploymentType::create($employmentType);
}/*
// Employment Types
$EmploymentTypes =[
 ['employment_type_list' => 'Regular'],['employment_type_list' => 'Job Order'],['employment_type_list' => 'Part-Time']
];

foreach($EmploymentTypes as $employmentType) {
 EmploymentType::create($employmentType);
}

$payrolls =[
  ['payslip_id' => 1111111111,'user_id' => 1,'basic_salary' => 50000,'publish_status' => 'publish'
  ],
  ['payslip_id' => 2222222222,'user_id' => 2,'basic_salary' => 50000,'publish_status' => 'publish'
  ],
];

foreach ($payrolls as $payroll) {
    Payroll::create($payroll);
}  

$pt_payrolls = [
  ['pt_payslip_id' => 3333333333,'user_id'=> 1,'rate' => 160,'publish_status' => 'publish'
  ],
    ['pt_payslip_id' => 4444444444,'user_id'=> 2,'rate' => 160,'publish_status' => 'publish'
  ],
    ['pt_payslip_id' => 5555555555,'user_id'=> 3,'rate' => 160,'publish_status' => 'publish'   
  ],
      ['pt_payslip_id' => 6666666666,'user_id'=> 4,'rate' => 160,'publish_status' => 'publish'
  ],
];


foreach($pt_payrolls as $pt_payroll) {

  PartTimePayroll::create($pt_payroll);
}







//JobTitle
      JobTitle::create([
        'department' => 'COT',
        'designation' => 'Instructor I'
       ]);
        
    }
      **/
}
}