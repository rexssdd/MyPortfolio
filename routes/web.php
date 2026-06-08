<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\PortfolioController;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name'    => 'required|string|max:100',
        'email'   => 'required|email',
        'message' => 'required|string|max:2000',
    ]);

    $apiKey = env('RESEND_API_KEY');

    if (!$apiKey) {
        Log::error('RESEND_API_KEY is not set.');
        return response()->json([
            'status'  => 'error',
            'message' => 'Mail service not configured. Please email me at lusicarexceljay@gmail.com',
        ], 500);
    }

    try {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type'  => 'application/json',
        ])->post('https://api.resend.com/emails', [
            'from'    => 'Rexcel Portfolio <onboarding@resend.dev>',
            'to'      => ['lusicarexceljay@gmail.com'],
            'subject' => 'Portfolio Contact from ' . $validated['name'],
            'html'    => "
                <p><strong>Name:</strong> {$validated['name']}</p>
                <p><strong>Email:</strong> {$validated['email']}</p>
                <hr>
                <p>" . nl2br(e($validated['message'])) . "</p>
            ",
        ]);

        Log::info('Resend response: ' . $response->status() . ' ' . $response->body());

        if ($response->successful()) {
            return response()->json([
                'status'  => 'success',
                'message' => "Message sent! I'll get back to you soon.",
            ]);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'Failed to send message. Please email me at lusicarexceljay@gmail.com',
        ], 500);

    } catch (\Exception $e) {
        Log::error('Contact form exception: ' . $e->getMessage());
        return response()->json([
            'status'  => 'error',
            'message' => 'Failed to send message. Please email me at lusicarexceljay@gmail.com',
        ], 500);
    }
})->name('contact.send');