<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('user_id');
            $table->unsignedInteger('employee_id')->unique();
            $table->string('last_name', 50);
            $table->string('first_name', 50);
            $table->string('designation', 50);
            $table->string('department', 50);
            $table->decimal('basic_pay',10,2)->nullable();
            $table->string('password');
            $table->string('employment_type', 50);
            $table->enum('status', ['verified', 'rejected', 'pending'])->default('pending');
            $table->enum('role', ['Admin','User'])->default('User');
            $table->timestamps();
        });
        
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
