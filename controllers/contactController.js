import mongoose from 'mongoose';
import contacts from '../model/ContactModel.js';

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

    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been saved successfully.",
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
