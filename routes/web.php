<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Sms\SenderController;
use App\Http\Controllers\Sms\MessageController;
use App\Http\Controllers\Sms\DashboardController;
use App\Http\Controllers\Sms\CreditController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    /* Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard'); */

    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::get('senders', [SenderController::class, 'index'])->name('senders.index');
    Route::post('senders', [SenderController::class, 'store'])->name('senders.store');
    Route::delete('senders/{id}', [SenderController::class, 'delete'])->name('senders.delete');

    Route::get('messages/{type}', [MessageController::class, 'index'])->name('messages.index');
    Route::post('messages', [MessageController::class, 'store'])->name('messages.store');

    Route::get('credits', [CreditController::class, 'index'])->name('credits.index');
    Route::post('credits', [CreditController::class, 'store'])->name('credits.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
