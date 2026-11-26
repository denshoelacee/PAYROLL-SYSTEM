<?php

use App\Models\User;

it('lets admins open admin pages', function (string $route) {
    $admin = User::factory()->create(['role' => 'Admin']);

    $this->actingAs($admin)->get(route($route))->assertOk();
})->with([
    'admin.dashboard',
    'admin.employee',
    'admin.department',
    'admin.payroll',
    'admin.reports.summary',
]);

it('lets employees open employee pages', function (string $route) {
    $employee = User::factory()->create(['role' => 'User']);

    $this->actingAs($employee)->get(route($route))->assertOk();
})->with([
    'employee.dashboard',
    'employee.payslip.summary',
]);

it('redirects employees away from admin pages', function () {
    $employee = User::factory()->create(['role' => 'User']);

    $this->actingAs($employee)->get(route('admin.dashboard'))->assertRedirect(route('employee.dashboard'));
});

it('redirects admins away from employee pages', function () {
    $admin = User::factory()->create(['role' => 'Admin']);

    $this->actingAs($admin)->get(route('employee.dashboard'))->assertRedirect(route('admin.dashboard'));
});

it('redirects guests to login', function () {
    $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
});
