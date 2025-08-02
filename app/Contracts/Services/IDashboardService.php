<?php

namespace App\Contracts\Services;

interface IDashboardService{

     public function getTaxAndUserSummary();

     public function latestGrossPayMonthly();     

     public function contributionBreakdown();
}