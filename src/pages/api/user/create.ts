import dbConnect from "@/lib/db";
import User from "@/models/user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, email, password, isAdmin } = req.body;

    try {
      const user = new User({
        name,
        email,
        password,
        isAdmin: isAdmin || false,
      });

      await user.save();

      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === 11000) {
        const key = Object.keys(error.keyPattern)[0];
        const value = error.keyValue[key];
        res.status(400).json({
          error,
          errorMsg: `Duplicate key error: ${key} '${value}' already exists.`,
        });
      } else {
        let errorMsg = "An unexpected error occurred";

        if (error.errors) {
          errorMsg = Object.values(error.errors)
            .map((err: any) => err.message)
            .join(", ");
        } else if (error.message) {
          errorMsg = error.message;
        }

        res.status(500).json({ error, errorMsg });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
