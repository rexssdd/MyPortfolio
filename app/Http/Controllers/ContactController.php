<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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

        Mail::to('lusicarexceljay@gmail.com')
            ->cc('r.lusica.545469@umindanao.edu.ph')
            ->send(new ContactMessage($validated));

        return back()->with('success', 'Message sent! I\'ll get back to you soon.');
    }
}
