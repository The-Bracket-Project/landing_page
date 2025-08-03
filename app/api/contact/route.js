import { NextResponse } from 'next/server';

// Email service setup - you can replace this with your preferred service
// For this example, I'll show how to set up with Resend (popular choice)
// Uncomment and install: npm install resend
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// Alternative: Using Nodemailer for SMTP
// Uncomment and install: npm install nodemailer
// import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, company, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Length validation
    if (name.length < 2 || name.length > 50) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 50 characters' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedData = {
      name: name.trim(),
      company: company?.trim() || 'Not specified',
      email: email.trim().toLowerCase(),
      message: message.trim()
    };

    // Email content
    const emailContent = `
      New Contact Form Submission
      
      Name: ${sanitizedData.name}
      Company: ${sanitizedData.company}
      Email: ${sanitizedData.email}
      
      Message:
      ${sanitizedData.message}
      
      ---
      Sent from Bracket AI Contact Form
      Timestamp: ${new Date().toISOString()}
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(90deg, #2563eb, #0891b2); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #2563eb; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #2563eb; margin-top: 10px; }
          .footer { text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span> ${sanitizedData.name}
            </div>
            <div class="field">
              <span class="label">Company:</span> ${sanitizedData.company}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${sanitizedData.email}
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <div class="message-box">${sanitizedData.message}</div>
            </div>
          </div>
          <div class="footer">
            <p>Sent from Bracket AI Contact Form</p>
            <p>${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email sending logic - Choose one method below

    // METHOD 1: Using Resend (Recommended)
    
    try {
      await resend.emails.send({
        from: 'contact@thebracket.io', // Must be verified domain
        to: process.env.CONTACT_EMAIL || 'your-email@company.com',
        subject: `New Contact: ${sanitizedData.name} from ${sanitizedData.company}`,
        text: emailContent,
        html: htmlContent,
        replyTo: sanitizedData.email
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // METHOD 2: Using Nodemailer with SMTP
    /*
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your SMTP service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use app password for Gmail
      }
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.CONTACT_EMAIL || 'your-email@company.com',
        subject: `New Contact: ${sanitizedData.name} from ${sanitizedData.company}`,
        text: emailContent,
        html: htmlContent,
        replyTo: sanitizedData.email
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }
    */

    // For now, just log the data (remove this when you set up email)
    console.log('Contact form submission:', sanitizedData);
    console.log('Email content prepared:', emailContent);

    // Auto-responder email to user (optional)
    /*
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: sanitizedData.email,
      subject: 'Thank you for contacting Bracket AI',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${sanitizedData.name},</p>
        <p>We've received your message and will get back to you shortly.</p>
        <p>Best regards,<br>The Bracket AI Team</p>
      `
    });
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 