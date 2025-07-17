<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::create([
        'employee_id' => 100001,
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

        User::factory(100)->create();
    }
}
