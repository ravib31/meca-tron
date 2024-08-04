import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net", // GoDaddy SMTP server
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: "admin@meca-tron.com",
        pass: "Mecatron123@",
      },
    });

    const mailOptions = {
      from: "admin@meca-tron.com",
      to: "admin@meca-tron.com",
      subject: `Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <h2 style="text-align: center; color: #333;">Contact Form Submission</h2>
          <p style="text-align: center;">You have received a new message from ${name} on your website.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #333;">Sender Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
    
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #333;">Message</h3>
            <p>${message}</p>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to send email", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
