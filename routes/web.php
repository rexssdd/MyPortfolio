<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\PortfolioController;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name'    => 'required|string|max:100',
        'email'   => 'required|email',
        'message' => 'required|string|max:2000',
    ]);

    try {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('RESEND_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.resend.com/emails', [
            'from'    => 'Rexcel Portfolio <onboarding@resend.dev>',
            'to'      => ['lusicarexceljay@gmail.com'],
            'cc'      => ['r.lusica.545469@umindanao.edu.ph'],
            'subject' => 'Portfolio Contact from ' . $validated['name'],
            'text'    => "From: {$validated['name']} <{$validated['email']}>\n\n{$validated['message']}",
        ]);

        if ($response->successful()) {
            return response()->json([
                'status'  => 'success',
                'message' => "Message sent! I'll get back to you soon.",
            ]);
        }

        Log::error('Resend API error: ' . $response->body());

        return response()->json([
            'status'  => 'error',
            'message' => 'Failed to send message. Please email me at lusicarexceljay@gmail.com',
        ], 500);

    } catch (\Exception $e) {
        Log::error('Contact form failed: ' . $e->getMessage());

        return response()->json([
            'status'  => 'error',
            'message' => 'Failed to send message. Please email me at lusicarexceljay@gmail.com',
        ], 500);
    }
})->name('contact.send');