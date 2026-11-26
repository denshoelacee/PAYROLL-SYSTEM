<?php

use App\Models\ContributionType;
use App\Services\Payroll\PayrollCalculator;

function rates(?float $rlip, ?float $philhealth): ContributionType
{
    return new ContributionType(['rlip' => $rlip, 'philhealth' => $philhealth]);
}

it('returns zero contributions when no rates are configured', function () {
    $calculator = new PayrollCalculator();

    expect($calculator->rlip(20000, null))->toEqual(0)
        ->and($calculator->philhealth(20000, null))->toEqual(0);
});

it('computes rlip as a percentage of salary', function () {
    expect((new PayrollCalculator())->rlip(20000, rates(9, 5)))->toEqual(1800);
});

it('applies the philhealth floor, rate and ceiling', function () {
    $calculator = new PayrollCalculator();
    $rates = rates(9, 5);

    expect($calculator->philhealth(8000, $rates))->toEqual(250)
        ->and($calculator->philhealth(10000, $rates))->toEqual(250)
        ->and($calculator->philhealth(20000, $rates))->toEqual(1000)
        ->and($calculator->philhealth(150000, $rates))->toEqual(5000);
});

it('sums deduction fields with contributions and ignores unknown fields', function () {
    $total = (new PayrollCalculator())->totalDeduction(
        ['absent' => '100.10', 'late' => 50, 'ucpb' => '25.555', 'pera' => 2000, 'unknown' => 999],
        300
    );

    expect($total)->toEqual(475.66);
});

it('builds payroll and deduction totals', function () {
    $result = (new PayrollCalculator())->calculate(20000, rates(9, 5), [
        'user_id' => 1,
        'pera' => 2000,
        'holding_tax' => 500,
    ]);

    expect($result['payroll'])->toMatchArray([
        'user_id' => 1,
        'pera' => 2000,
        'holding_tax' => 500,
        'rlip' => 1800.0,
        'philhealth' => 1000.0,
        'basic_salary' => 20000.0,
    ])->and($result['deduction'])->toEqual([
        'total_accrued_period' => 22000.0,
        'total_deduction' => 3300.0,
        'net_pay' => 18700.0,
    ]);
});

it('treats a missing basic pay as zero salary', function () {
    $result = (new PayrollCalculator())->calculate(null, null, []);

    expect($result['payroll']['basic_salary'])->toBeNull()
        ->and($result['deduction']['net_pay'])->toEqual(0);
});
