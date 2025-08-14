<?php

namespace App\Contracts\Services;

interface DashboardServiceInterface{

     public function getTaxAndUserSummary();

     public function latestGrossPayMonthly();

     public function contributionBreakdown();
}
