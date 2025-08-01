<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\EmploymentType;
use App\Models\JobTitle;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::create([
        'employee_id' => 3220231,
        'last_name' => 'Admin',
        'first_name' => 'Super',
        'designation' => 'System Admin',
        'department' => 'IT',
        'basic_pay' => 50000,
        'employment_type' => 'Full-time',
        'password' => Hash::make('admin123'),
        'status' => 'verified',
        'role' => 'Admin',
    ]);
      EmploymentType::create([

        'employment_type_list' => 'Regular'
      ]);

      JobTitle::create([
        'department' => 'COT',
        'designation' => 'Instructor I'
       ]);
        
    }
}
