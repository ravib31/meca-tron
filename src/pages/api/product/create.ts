import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/db";
import Product from "@/models/product";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dszfemjyh",
  api_key: "258153437492282",
  api_secret: "rQzVKEHqwbNgv5V8cCnR0cy07yQ", // Replace with your actual API secret
});

// Custom config to handle larger request bodies
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired size limit here
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, price, category, image } = req.body;

    try {
      // Upload an image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      // Check if the image was uploaded successfully
      if (uploadResult?.secure_url) {
        // Optional: Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
          fetch_format: "auto",
          quality: "auto",
        });

        // Create a new product
        const product = new Product({
          name,
          price,
          category,
          image: {
            url: optimizeUrl, // Use the optimized URL
            public_id: uploadResult.public_id,
          },
        });

        // Save the product to the database
        await product.save();

        // Send success response
        res.status(201).json(product);
      } else {
        // Handle image upload failure
        res
          .status(500)
          .json({ errorMsg: "Failed to upload image to Cloudinary" });
      }
    } catch (error) {
      // Handle errors
      let errorMsg = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMsg = error.message;
      } else if ((error as any).errors) {
        errorMsg = Object.values((error as any).errors)
          .map((err: any) => err.message)
          .join(", ");
      }

      res.status(500).json({ error, errorMsg });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
