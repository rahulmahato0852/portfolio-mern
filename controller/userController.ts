import { Request, Response } from 'express';
import sendEmail from '../utils/sendEmail';
const asyncHandler = require("express-async-handler")

export const addMessage = asyncHandler(async (req: Request, res: Response) => {

  const { subject, text, to, name, email } = req.body




  const html = `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3498db;">Hello ${name},</h2>
      <p style="color: #555;">Thank you for reaching out! Your message has been received.</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p><strong>Phone no:</strong><a href="tel:8446414152">+91 8446414152</a></p>
      </div>
      
      <p style="color: #555; margin-top: 20px;">I'll get back to you soon!</p>
      
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #999;">Best regards,</p>
        <p style="color: #3498db;">Rahul Mehata</p>
      </div>
    </div>
  `;

  const Mehtml = `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3498db;">Hello Rahul,</h2>
      <p style="color: #555;">I am ${name}</p>
      <p style="color: ;">Subject:${subject}</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p>${text}</p>
      </div>
      
      <p style="color: #555; margin-top: 20px;">My email is ${email}!</p>
      
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #999;">Best regards,</p>
        <p style="color: #3498db;">${name}</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: email, subject: `Thank you For contacting`, text: `Dear ${name},\n\nThank you so much for reaching out! Your message means a lot. I'll make it a priority to get back to you soon. 😊\n\nBest regards,\n[Rahul Mehata]`,
    html
  })
  await sendEmail({ subject, text, html: Mehtml })

  res.status(200).json({ message: "Email Send Success" })

})