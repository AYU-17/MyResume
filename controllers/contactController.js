import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import contacts from '../model/ContactModel.js';
import dotenv from 'dotenv';
dotenv.config()

const createEmailTransporter = () => {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_SECURE,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    console.warn('Contact notification email is not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS.');
    return null;
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: EMAIL_SECURE === 'true',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

const sendNotificationEmail = async ({ name, email, subject, message }) => {
  const {
    RESEND_API_KEY,
    RESEND_FROM,
    EMAIL_TO,
    EMAIL_USER,
  } = process.env;

  const toEmail = EMAIL_TO || EMAIL_USER;
  const emailSubject = `New message from ${name} via portfolio contact form`;
  const emailHtml = `
    <h2>New message form portfolio</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br/>')}</p>
    <p><small>Received on ${new Date().toLocaleString()}</small></p>
  `;

  // 1. If Resend API key is configured, use the HTTPS API (works on Render free tier)
  if (RESEND_API_KEY && typeof fetch === 'function') {
    try {
      console.log('Attempting to send email via Resend API...');
      const fromEmail = RESEND_FROM || 'onboarding@resend.dev';
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'User-Agent': 'MyResume/1.0',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }
      console.log('Notification email sent successfully via Resend API:', data);
      return true;
    } catch (resendError) {
      console.error('Failed to send email via Resend API:', resendError);
      // Fall through to SMTP if SMTP is configured
    }
  }

  // 2. Fallback to Nodemailer SMTP (e.g. for local development)
  const transporter = createEmailTransporter();
  if (transporter) {
    try {
      console.log('Attempting to send email via Nodemailer SMTP...');
      await transporter.sendMail({
        from: `"Portfolio Contact" <${EMAIL_USER}>`,
        to: toEmail,
        subject: emailSubject,
        html: emailHtml,
      });
      console.log('Notification email sent successfully via Nodemailer SMTP.');
      return true;
    } catch (smtpError) {
      console.error('Failed to send notification email via SMTP:', smtpError);
    }
  } else {
    console.warn('SMTP transporter not configured.');
  }

  return false;
};

export const contactController = async (req, res) => {
  console.log('Contact POST body:', req.body);
  console.log('Mongoose readyState:', mongoose.connection.readyState);

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All form fields are required",
      });
    }

    const newContact = await contacts.create({
      name,
      email,
      subject,
      message,
    });

    console.log(`Saved new contact message from ${name} (${email})`);

    await sendNotificationEmail({ name, email, subject, message });

    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been saved successfully. I will reply by email or WhatsApp soon.",
    });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    if (error.stack) console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: "Server error: unable to save message at this time.",
    });
  }
};
