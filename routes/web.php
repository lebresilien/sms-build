<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Sms\SenderController;

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
