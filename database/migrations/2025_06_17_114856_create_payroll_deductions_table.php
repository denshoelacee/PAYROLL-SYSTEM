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
        Schema::create('payroll_deductions', function (Blueprint $table) {
            $table->bigIncrements('payroll_deduction_id');
            $table->unsignedBigInteger('payroll_id')->nullable();
            $table->decimal('total_accrued_period',10,2);
            $table->decimal('total_deduction',10,2);
            $table->decimal('net_pay',10,2);
            $table->timestamps();

            $table->foreign('payroll_id')
                  ->references('payroll_id')
                  ->on('payrolls')
                  ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_deductions');
    }
};
