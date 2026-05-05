<?php

namespace App\Repository;

use App\Contracts\Repository\PayrollDeductionRepositoryInterface;
use App\Models\PayrollDeduction;

class PayrollDeductionRepository implements PayrollDeductionRepositoryInterface
{

    public function create(array $data): PayrollDeduction
    {
        return PayrollDeduction::create($data);
    }

    public function calculateTotalAccruedPeriod(array $data):float
    {   
         $basic = isset($data['basic_salary']) ? floatval($data['basic_salary']) : 0;
         $pera = isset($data['pera']) ? floatval($data['pera']) : 0;

         return round($basic + $pera, 2);
    }

    public function calculateTotalDeduction(array $data, float $totalContribution):float
    {
         $deductionFields = [
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
        // 'philhealth',
        // 'rlip',
        'sss',
        'deduction1',
        'deduction2',
        'deduction3',
    ];

    $total = 0;

    foreach ($deductionFields as $field) {
        $value = isset($data[$field]) ? floatval($data[$field]) : 0;
        $total += $value;
    }

    $total += $totalContribution;

    return round($total, 2);
    }

}
