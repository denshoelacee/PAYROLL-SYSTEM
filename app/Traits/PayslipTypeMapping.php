<?php

namespace App\Traits;

use InvalidArgumentException;


trait PayslipTypeMapping
{

    
    public function typeMapping($payslipType)
    {

        return match($payslipType){          

            'Regular'   => ['Regular'],
            'Job Order' => ['Job Order'],
            'Part-Time' => ['Part-Time', 'Regular|Part-Time', 'Job Order|Part-Time'],
            'All'       => ['Regular', 'Job Order', 'Part-Time', 'Regular|Part-Time', 'Job Order|Part-Time'],
            default     => throw new InvalidArgumentException("Invalid payslip type: $payslipType")
        
        };

    }
}