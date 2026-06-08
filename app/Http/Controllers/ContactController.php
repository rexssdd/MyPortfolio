<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ContactMessage;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:150',
            'message' => 'required|string|min:10|max:2000',
        ]);

        try {
            Mail::to('lusicarexceljay@gmail.com')
                ->cc('r.lusica.545469@umindanao.edu.ph')
                ->send(new ContactMessage($validated));

            return response()->json([
                'status'  => 'success',
                'message' => "Message sent! I'll get back to you soon.",
            ]);

        } catch (\Exception $e) {
            Log::error('Contact form mail failed: ' . $e->getMessage());

            return response()->json([
                'status'  => 'error',
                'message' => 'Sorry, the message could not be sent. Please email me directly at lusicarexceljay@gmail.com',
            ], 500);
        }
    }
}