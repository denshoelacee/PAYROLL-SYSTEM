<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => $this->faker->unique()->numerify('1#####'), // ensures no 100001 duplicates
            'last_name' => fake()->lastName(),
            'first_name' => fake()->firstName(),
            'designation' => 'Staff',
            'department' => 'HR',
            'basic_pay' => fake()->randomFloat(2, 10000, 30000),
            'employment_type' => 'Full-time',
            'password' => bcrypt('password'),
            'status' => 'verified',
            'role' => 'User',
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
