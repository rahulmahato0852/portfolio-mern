import nodemailer from "nodemailer"
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

interface EmailOptions {
    to?: string;
    subject: string;
    text: string;
    html?: string
}

const sendEmail = (emailOptions: EmailOptions): Promise<any> => new Promise((resolve, reject) => {
    try {
        const { to = process.env.FROM_EMAIL, subject = "Inquary", text = "FOR HIRING", html = `` } = emailOptions
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })
        transporter.sendMail({ to, from: process.env.FROM_EMAIL, subject: subject, text: text, html }, (error) => {
            if (error) {
                console.log(error)
                return reject(error.message)
            }
            resolve("Email Send Success")

        })


    } catch (error: any) {
        return reject(error.message)
    }
})


export default sendEmail