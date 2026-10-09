import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Uses Web3Forms free API endpoint to forward directly to himaza.creates@gmail.com
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Get a free instant key at web3forms.com or use direct endpoint
        email: 'himaza.creates@gmail.com',
        from_name: name,
        replyto: email,
        subject: subject || `Portfolio Contact from ${name}`,
        message: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}