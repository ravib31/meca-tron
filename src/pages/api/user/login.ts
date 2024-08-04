import dbConnect from "@/lib/db";
import User from "@/models/user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ errorMsg: "Invalid email or password" });
      }

      // Check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ errorMsg: "Invalid email or password" });
      }

      // Create a session or token (simple example)
      const session = { userId: user._id, name: user.name };

      res.status(200).json({ session });
    } catch (error: any) {
      let errorMsg = "An unexpected error occurred";

      if (error.message) {
        errorMsg = error.message;
      }

      res.status(500).json({ error, errorMsg });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
