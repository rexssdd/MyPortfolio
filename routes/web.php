<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\PortfolioController;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::post('/contact', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'name'    => 'required|string|max:100',
        'email'   => 'required|email',
        'message' => 'required|string|max:2000',
    ]);

    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('RESEND_API_KEY'),
        'Content-Type'  => 'application/json',
    ])->post('https://api.resend.com/emails', [
        'from'    => 'Rexcel Portfolio <onboarding@resend.dev>',
        'to'      => ['lusicarexceljay@gmail.com'],
        'cc'      => ['r.lusica.545469@umindanao.edu.ph'],
        'subject' => 'Portfolio Contact from ' . $request->name,
        'text'    => "From: {$request->name} <{$request->email}>\n\n{$request->message}",
    ]);

    if ($response->successful()) {
        return back()->with('success', "Message sent! I'll get back to you soon.");
    }

    return back()->with('error', 'Failed to send message. Please try again.')->withInput();
})->name('contact.send');