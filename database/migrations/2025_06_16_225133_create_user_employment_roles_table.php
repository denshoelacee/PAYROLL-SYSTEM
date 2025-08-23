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
        Schema::create('user_employment_roles', function (Blueprint $table) {
            $table->bigIncrements('role_id');
            $table->unsignedBigInteger('user_id')->nullable(); 
            $table->string('type', 50)->nullable();
            $table->string('designation', 50)->nullable();
            $table->string('department', 50)->nullable();
            $table->timestamps();
            
             $table->foreign('user_id')
                   ->references('user_id')
                   ->on('users')
                   ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_employment_roles');
    }
};
