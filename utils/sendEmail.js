"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config({ path: "./.env" });
const sendEmail = (emailOptions) => new Promise((resolve, reject) => {
    try {
        const { to = process.env.FROM_EMAIL, subject = "Inquary", text = "FOR HIRING", html = `` } = emailOptions;
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });
        transporter.sendMail({ to, from: process.env.FROM_EMAIL, subject: subject, text: text, html }, (error) => {
            if (error) {
                console.log(error);
                return reject(error.message);
            }
            resolve("Email Send Success");
        });
    }
    catch (error) {
        return reject(error.message);
    }
});
exports.default = sendEmail;
