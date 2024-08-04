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

  if (req.method === "PUT" || req.method === "PATCH") {
    const { _id, name, price, category, image } = req.body;

    try {
      let updatedImage = null;

      if (!image?.url) {
        const cldRes = await cloudinary.v2.uploader.upload(image, {
          folder: "meca-tron",
        });

        if (cldRes?.secure_url) {
          updatedImage = {
            url: cldRes.secure_url,
            public_id: cldRes.public_id,
          };
        } else {
          return res
            .status(500)
            .json({ error: "Failed to upload image to Cloudinary" });
        }
      }

      // Find the product by ID and update its details
      const product = await Product.findById(_id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.category = category || product.category;
      if (updatedImage) {
        await cloudinary.v2.uploader.destroy(product.image.public_id);
        product.image = updatedImage;
      }

      await product.save();

      res.status(200).json(product);
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
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
