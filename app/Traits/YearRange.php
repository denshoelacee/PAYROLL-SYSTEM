<?php

namespace App\Traits;

trait YearRange
{

    public function yearRange()
    {

        return range(2025, now()->year);
        
    }
}