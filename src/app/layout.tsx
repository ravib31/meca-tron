"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Mecatron is your premier destination for high-quality spare parts for a wide range of vehicles and machinery. Explore our vast inventory of automotive, industrial, and heavy equipment parts. Enjoy competitive pricing, expert support, and fast shipping."
        />
        <title>Mecatron</title>
      </head>
      <body>
        <Toaster position="top-right" />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
