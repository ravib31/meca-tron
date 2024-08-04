"use client";

import Navbar from "@/components/HomeHeader";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/utils/interface";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("/api/product/get");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Navbar />
      <main className="bg-gray-100">
        <div className="py-10 ">
          <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
          <div
            className="grid w-full max-w-screen-xl mx-auto p-5 justify-center items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            id="products"
          >
            {products.map((item: Product) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </main>
      <footer>
        <ul className="flex items-center justify-center lg:justify-between flex-wrap gap-3 lg:mx-12 py-2">
          <li className="flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ee4e3e] text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-600 dark:text-slate-400">
                Shop no. 323/31 Madan motor market Panjasarif, Kashmere Gate,
              </p>
              <p className="text-gray-600 dark:text-slate-400">
                Delhi- 110007, India
              </p>
            </div>
          </li>
          <li className="flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ee4e3e] text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                <path d="M15 7a2 2 0 0 1 2 2" />
                <path d="M15 3a6 6 0 0 1 6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-600 dark:text-slate-400">
                Mobile: +91 98994 30052
              </p>
              <p className="text-gray-600 dark:text-slate-400">
                Mail: mecatron644@gmail.com
              </p>
            </div>
          </li>
        </ul>
      </footer>
    </>
  );
}
