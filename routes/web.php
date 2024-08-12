<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\GiftController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return redirect("/events");
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource("events", EventController::class);
    Route::get("events/{event}/report", [EventController::class, "report"])->name("event.report");
    Route::get("events/{event}/report-pdf", [EventController::class, "reportPdf"])->name("event.report.pdf");
    Route::resource("events/{event}/gifts", GiftController::class);
    Route::get("events/{event}/gifts/{gift}/rec-pdf", [GiftController::class, "pdf"])->name("gift.rec.pdf");
});

require __DIR__ . '/auth.php';
