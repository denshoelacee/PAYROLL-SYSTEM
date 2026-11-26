<?php

namespace App\Services\Payroll;

use App\Models\ContributionType;

class PayrollCalculator
{
    public const DEDUCTION_FIELDS = [
        'absent',
        'late',
        'holding_tax',
        'tax_bal_due',
        'policy_loan',
        'consol_loan',
        'emerg_loan',
        'gel',
        'gfal',
        'mpl',
        'mpl_lite',
        'contributions',
        'loans',
        'housing_loan',
        'cfi',
        'tipid',
        'city_savings_bank',
        'fea',
        'canteen',
        'disallowance',
        'unliquidated_ca',
        'disallowance_honoraria',
        'coop',
        'landbank',
        'ucpb',
    ];

    public const PHILHEALTH_MIN_SALARY = 10000.00;
    public const PHILHEALTH_MAX_SALARY = 100000.00;
    public const PHILHEALTH_MIN_PREMIUM = 250.00;

    /**
     * @return array{payroll: array<string, mixed>, deduction: array{total_accrued_period: float, total_deduction: float, net_pay: float}}
     */
    public function calculate(?float $basicPay, ?ContributionType $rates, array $data): array
    {
        $salary = (float) $basicPay;

        $rlip = $this->rlip($salary, $rates);
        $philhealth = $this->philhealth($salary, $rates);

        $totalAccruedPeriod = $salary + (float) ($data['pera'] ?? 0);
        $totalDeduction = $this->totalDeduction($data, $rlip + $philhealth);

        return [
            'payroll' => array_merge($data, [
                'rlip' => $rlip,
                'philhealth' => $philhealth,
                'basic_salary' => $basicPay,
            ]),
            'deduction' => [
                'total_accrued_period' => $totalAccruedPeriod,
                'total_deduction' => $totalDeduction,
                'net_pay' => $totalAccruedPeriod - $totalDeduction,
            ],
        ];
    }

    public function rlip(float $salary, ?ContributionType $rates): float
    {
        if (!$rates || !isset($rates->rlip)) {
            return 0;
        }

        return $salary * $rates->rlip / 100;
    }

    public function philhealth(float $salary, ?ContributionType $rates): float
    {
        if (!$rates || !isset($rates->philhealth)) {
            return 0;
        }

        if ($salary <= self::PHILHEALTH_MIN_SALARY) {
            return self::PHILHEALTH_MIN_PREMIUM;
        }

        return min($salary, self::PHILHEALTH_MAX_SALARY) * $rates->philhealth / 100;
    }

    public function totalDeduction(array $data, float $totalContribution): float
    {
        $total = $totalContribution;

        foreach (self::DEDUCTION_FIELDS as $field) {
            $total += isset($data[$field]) ? floatval($data[$field]) : 0;
        }

        return round($total, 2);
    }
}
