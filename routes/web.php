<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::post('/contact', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'name'    => 'required|string|max:100',
        'email'   => 'required|email',
        'message' => 'required|string|max:2000',
    ]);

    \Illuminate\Support\Facades\Mail::raw(
        "From: {$request->name} <{$request->email}>\n\n{$request->message}",
        function ($mail) use ($request) {
            $mail->to('lusicarexceljay@gmail.com')
                 ->cc('r.lusica.545469@umindanao.edu.ph')
                 ->subject("Portfolio Contact from {$request->name}");
        }
    );

    return back()->with('success', "Message sent! I'll get back to you soon.");
})->name('contact.send');