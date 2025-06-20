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
        Schema::create('deduction_types', function (Blueprint $table) {
        $table->bigIncrements('deduction_type_id');
        $table->decimal('absent', 10, 2)->nullable();
        $table->decimal('late', 10, 2)->nullable();
        $table->decimal('holding_tax', 10, 2)->nullable();
        $table->decimal('tax_bal_due', 10, 2)->nullable();
        $table->decimal('rlip', 10, 2)->nullable();
        $table->decimal('policy_loan', 10, 2)->nullable();
        $table->decimal('consol_loan', 10, 2)->nullable();
        $table->decimal('emerg_loan', 10, 2)->nullable();
        $table->decimal('gel', 10, 2)->nullable();
        $table->decimal('gfal', 10, 2)->nullable();
        $table->decimal('mpl', 10, 2)->nullable();
        $table->decimal('mpl_lite', 10, 2)->nullable();
        $table->decimal('contributions', 10, 2)->nullable();
        $table->decimal('loans', 10, 2)->nullable();
        $table->decimal('housing_loan', 10, 2)->nullable();
        $table->decimal('philhealth', 10, 2)->nullable();
        $table->decimal('cfi', 10, 2)->nullable();
        $table->decimal('tipid', 10, 2)->nullable();
        $table->decimal('city_savings_bank', 10, 2)->nullable();
        $table->decimal('fea', 10, 2)->nullable();
        $table->decimal('canteen', 10, 2)->nullable();
        $table->decimal('disallowance', 10, 2)->nullable();
        $table->decimal('unliquidated_ca', 10, 2)->nullable();
        $table->decimal('disallowance_honoraria', 10, 2)->nullable();
        $table->decimal('coop', 10, 2)->nullable();
        $table->decimal('landbank', 10, 2)->nullable();
        $table->decimal('ucpb', 10, 2)->nullable();
        $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deduction_types');
    }
};
