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
            $table->unsignedBigInteger('employee_id')->unique();
            $table->string('last_name');
            $table->string('first_name');
            $table->string('designation');
            $table->string('department');
            $table->decimal('basic_pay',10,2)->nullable();
            $table->string('password');
            $table->string('employment_type');
            $table->enum('status', ['verified', 'rejected', 'pending'])->default('pending');
            $table->enum('role', ['Admin','User'])->default('User');
            $table->rememberToken();
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
