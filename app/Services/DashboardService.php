<?php

namespace App\Services;

use Carbon\Carbon;
use App\Contracts\Repository\IUserRepository;
use App\Contracts\Services\IDashboardService;

class DashboardService implements IDashboardService{

     public function __construct(protected IUserRepository $userRepo) {}

     public function getMonthlyUserStatsService(int $year = null): array
    {
        $year = $year ?? now()->year;
        $monthlyCounts = $this->userRepo->getMonthlyUserStats($year);

        $currentMonth = now()->month;
        $previousMonth = now()->subMonth()->month;

        $current = $monthlyCounts[$currentMonth] ?? 0;
        $previous = $monthlyCounts[$previousMonth] ?? 0;

        $percentChange = $previous > 0
            ? round((($current - $previous) / $previous) * 100, 1)
            : ($current > 0 ? 100 : 0);

        $chartData = collect(range(1, 12))->map(fn($m) => [
            'month' => Carbon::create()->month($m)->format('F'),
            'Users' => $monthlyCounts[$m] ?? 0,
        ]);

        return [
            'chartData' => $chartData,
            'percentChange' => $percentChange,
        ];
    }
}