import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import contacts from '../model/ContactModel.js';

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

    const transporter = createEmailTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `New message from ${name} via portfolio contact form`,
          html: `
            <h2>New message form portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
            <p><small>Received on ${new Date().toLocaleString()}</small></p>
          `,
        });
        console.log('Notification email sent for new contact message.');
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
      }
    }

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
