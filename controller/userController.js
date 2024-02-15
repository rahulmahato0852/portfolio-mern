"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = void 0;
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const asyncHandler = require("express-async-handler");
exports.addMessage = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, text, to, name, email } = req.body;
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
    yield (0, sendEmail_1.default)({
        to: email, subject: `Thank you For contacting`, text: `Dear ${name},\n\nThank you so much for reaching out! Your message means a lot. I'll make it a priority to get back to you soon. 😊\n\nBest regards,\n[Rahul Mehata]`,
        html
    });
    yield (0, sendEmail_1.default)({ subject, text, html: Mehtml });
    res.status(200).json({ message: "Email Send Success" });
}));
