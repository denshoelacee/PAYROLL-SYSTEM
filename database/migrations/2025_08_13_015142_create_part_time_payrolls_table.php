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
        Schema::create('part_time_payrolls', function (Blueprint $table) {
            $table->bigIncrements('pt_id');
            $table->unsignedBigInteger('user_id');
            $table->string('employment')->nullable();
            $table->unsignedDecimal('rate', 15, 2);
            $table->unsignedSmallInteger('units');
            $table->unsignedSmallInteger('service_rendered');
            $table->decimal('total_accrued', 15, 2)->nullable();
            $table->decimal('absent_no_pay')->nullable();
            $table->decimal('deduction_due_absent_tardiness')->nullable();
            $table->decimal('pt_gross_pay')->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('part_time_payrolls');
    }
};
