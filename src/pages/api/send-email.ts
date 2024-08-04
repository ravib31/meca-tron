import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface UserDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  img: string;
}

interface RequestBody {
  userDetails: UserDetails;
  cart: CartItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userDetails, cart }: RequestBody = req.body;

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
      to: [userDetails.email, "admin@meca-tron.com"],
      subject: "Order Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <h1 style="text-align: center; color: #4CAF50;">Order Confirmation</h1>
          <p style="text-align: center;">Thank you for your order, <strong>${
            userDetails.name
          }</strong>!</p>
          <p style="text-align: center;">Here are your order details:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #333;">Contact Information</h2>
            <p><strong>Phone:</strong> ${userDetails.phone}</p>
            <p><strong>Address:</strong> ${userDetails.address}</p>
          </div>

          <h2 style="color: #333;">Cart Items</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${cart
                .map(
                  (item) => `
                <tr>
                  <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.name}</td>
                  <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.qty}</td>
                  <td style="border-bottom: 1px solid #ddd; padding: 8px;">₹ ${item.price}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div style="margin-top: 20px;">
            <h2 style="text-align: right; color: #333;">Total: ₹ ${cart.reduce(
              (acc, item) => acc + item.qty * item.price,
              0
            )}</h2>
          </div>
        </div>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
