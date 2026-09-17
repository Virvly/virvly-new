import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid content type. Expected application/json.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Validate fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter your name.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please write your message.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = import.meta.env.RESEND_API_KEY || (typeof process !== 'undefined' ? process.env.RESEND_API_KEY : undefined);
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured in environment variables.');
      return new Response(
        JSON.stringify({ success: false, error: 'Email service is not configured. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    const fromAddress = import.meta.env.RESEND_FROM_EMAIL || (typeof process !== 'undefined' ? process.env.RESEND_FROM_EMAIL : undefined) || 'Virvly Contact <notifications@send.virvly.com>';

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: ['hello@virvly.com'],
      replyTo: `${cleanName} <${cleanEmail}>`,
      subject: `New Contact Enquiry from ${cleanName} — Virvly`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Enquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #232323; background-color: #f7f7f7; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e5e5; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.03); }
    .header { background-color: #053349; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .header p { margin: 4px 0 0; font-size: 13px; color: #cbd5e1; }
    .content { padding: 28px 24px; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #00759F; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #1C1C1C; }
    .message-box { background: #fbfbfb; border: 1px solid #e5e5e5; border-left: 4px solid #F78C1E; border-radius: 6px; padding: 16px; margin-top: 6px; white-space: pre-wrap; font-size: 14.5px; line-height: 1.6; }
    .footer { padding: 16px 24px; background: #fafafa; border-top: 1px solid #eaeaea; font-size: 12px; color: #737373; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Enquiry</h1>
      <p>Submitted via Virvly Contact Form</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Sender Name</div>
        <div class="field-value"><strong>${cleanName}</strong></div>
      </div>
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${cleanEmail}" style="color: #00759F; text-decoration: none;">${cleanEmail}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${cleanMessage.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
    </div>
    <div class="footer">
      This email was sent from the contact form on <a href="https://virvly.com" style="color: #00759F;">virvly.com</a>. Hitting "Reply" will reply directly to ${cleanEmail}.
    </div>
  </div>
</body>
</html>
      `,
      text: `New Contact Enquiry from Virvly Contact Form\n\nName: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}\n\n---\nHit reply to respond directly to ${cleanEmail}.`
    });

    if (error) {
      console.error('Resend API error:', error);
      return new Response(
        JSON.stringify({ success: false, error: error.message || 'Failed to send email.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!', id: data?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'An unexpected server error occurred.';
    console.error('Unhandled contact endpoint error:', err);
    return new Response(
      JSON.stringify({ success: false, error: errorMsg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const ALL: APIRoute = async () => {
  return new Response(
    JSON.stringify({ success: false, error: 'Method not allowed.' }),
    { status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } }
  );
};
