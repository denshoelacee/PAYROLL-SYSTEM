# CTU Payroll System

Payroll management for CTU Danao. Admins manage employees, HR metadata and monthly payroll; employees view and download their payslips.

**Stack:** Laravel 10 (PHP 8.2), Inertia.js + React 18 + TypeScript, Tailwind CSS, MySQL, Laravel Reverb (real-time notifications).

## Setup

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
# set DB_* in .env (MySQL), then:
php artisan migrate --seed
```

## Running

```bash
php artisan serve        # app
npm run dev              # Vite dev server
php artisan reverb:start # real-time notifications (optional)
```

## Checks

```bash
php artisan test   # Pest (feature tests need the MySQL database from .env)
npm run build      # tsc + vite build
```

## Project structure

```
app/
  Contracts/            Interfaces, bound in Providers/DependencyInjectionProvider.php
    Repositories/
    Services/{Account,Auth,Payroll,Reports}/
  Http/Controllers/
    Admin/              Admin-only pages and actions (routes/admin.php)
    Employee/           Employee pages (routes/employee.php)
    Auth/               Login, registration, password reset (routes/auth.php)
  Repositories/         Database reads/writes (Eloquent / query builder)
  Services/
    Account/            Create, edit, delete and batch approve/reject accounts
    Auth/               Password reset via secret question
    Payroll/            PayrollService + PayrollCalculator (contributions, deductions, net pay)
    Reports/            Payroll and payslip reports
routes/
  web.php               Public routes, includes auth.php
  admin.php             /admin/*, name prefix "admin.", middleware auth + role:Admin
  employee.php          /employee/*, name prefix "employee.", middleware auth + role:User
resources/js/
  Pages/                Inertia pages only (one file per rendered page)
  Features/             Page sections grouped by feature (Admin/Employees, Admin/Payroll, ...)
  Components/           Shared UI components (Payslip/, ui/, ...)
  Layouts/, hooks/, lib/, types/
```

## Developers

Deniel D. Ybañez, John Mark G. Tayone, Lanie P. Payot
