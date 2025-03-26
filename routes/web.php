<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Sms\SenderController;
use App\Http\Controllers\Sms\MessageController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('senders', [SenderController::class, 'index'])->name('senders.index');
    Route::post('senders', [SenderController::class, 'store'])->name('senders.store');
    Route::delete('senders/{id}', [SenderController::class, 'delete'])->name('senders.delete');

    Route::get('messages', [MessageController::class, 'index'])->name('messages.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
