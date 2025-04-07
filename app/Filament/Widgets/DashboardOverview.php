<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\{ Transaction, Account };

class DashboardOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Solde', 10000),
            Stat::make('Nombre de comptes', Account::all()->count()),
            Stat::make('Nombre de transactions', Transaction::all()->count()),
        ];
    }
}
