<?php

namespace App\Contracts\Services;

interface IDashboardService{

     public function getMonthlyUserStatsService(int $year = null): array;
}