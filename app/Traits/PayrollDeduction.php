<?php

namespace App\Traits;

use InvalidArgumentException; 
trait PayrollDeduction
{
        
    public function calculateSalaryAndDeduction($data, $totalContributionDeduction)
    {
        $totalDeduction = $this->calculateTotalDeduction($data, $totalContributionDeduction);
        
        switch($data['employment_type']) {
            case 'Regular':
                $grossPay = $data['salary'] + ($data['pera'] ?? 0);
                break;
                
            case 'Job Order':
                $grossPay = $this->calculateDailyWork($data['daily_rate'], $data['duty_count']);
                break;
                
            case 'Part-Time':
                $grossPay = $this->calculateHourlyWork($data['hourly_rate'], $data['service_rendered']);
                break;
                
            default:
                throw new InvalidArgumentException("Unsupported employment type: {$data['employment_type']}");
        }
        
        return [
            'grossPay' => $grossPay,
            'totalDeduction' => $totalDeduction,
            'netPay' => $grossPay - $totalDeduction
        ];
    }

    private function calculateTotalDeduction(array $data, float $totalContribution):float
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
            'sss',
            'deduction1',
            'deduction2',
            'deduction3',
        ];

        $total = 0;

        foreach ($deductionFields as $field){
            $value = isset($data[$field]) ? floatval($data[$field]) : 0;
            $total += $value;
        }

        $total += $totalContribution;

        return round($total, 2);
    }


    private function calculateDailyWork($daily_rate, $duty_count)
    {
        if ($daily_rate < 0 || $duty_count < 0) {
            throw new InvalidArgumentException('Daily rate and duty count must be non-negative');
        }
        
        return $daily_rate * $duty_count;
    }


    private function calculateHourlyWork($hourly_rate, $service_rendered)
    {
        if ($hourly_rate < 0 || $service_rendered < 0) {
            throw new InvalidArgumentException('Hourly rate and service rendered must be non-negative');
        }
        
        return $hourly_rate * $service_rendered;
    }
}   