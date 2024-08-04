// pages/api/product/add.ts

import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dnlqvbcjn",
  api_key: "825974577438938",
  api_secret: "9aJ_plWq6n3KXlgwkVfPfLh1e3Q",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      // Find the product by ID
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Delete the image from Cloudinary
      await cloudinary.v2.uploader.destroy(product.image.public_id);

      // Delete the product from the database
      await product.deleteOne();

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: any) {
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
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
