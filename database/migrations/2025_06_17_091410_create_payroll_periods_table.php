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
        Schema::create('payroll_periods', function (Blueprint $table) {
            $table->bigIncrements('payroll_period_id');
            $table->unsignedBigInteger('payroll_id');
            $table->string('start_period')->nullable();
            $table->string('end_period')->nullable();
            $table->decimal('period_salary',10,2);
            $table->timestamps();

            $table->foreign('payroll_id')
                  ->references('payroll_id')
                  ->on('payrolls')
                  ->onDelete('cascade');
        });
          
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_periods');
    }
};
