import React from "react";
import Button from "./Button";
import handleScroll from "@/utils/handleScroll";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const cart = useSelector((state: any) => state.cart);

  return (
    <div className="fixed inset-x-0 flex flex-wrap gap-1 justify-center items-center md:gap-4 top-5 font-semibold text-2xl md:text-5xl text-center font-roboto animate-fade-right animate-once animate-duration-800 animate-delay-800 z-10">
      <Button onClick={() => handleScroll("header", document)}>Mecatron</Button>
      <Button onClick={() => handleScroll("products", document)}>
        Products
      </Button>
      <Link className="flex items-center justify-center" href="/cart">
        <Button>Cart ({cart?.length})</Button>
      </Link>
      <Link className="flex items-center justify-center" href="/contact-us">
        <Button>Contact us</Button>
      </Link>
    </div>
  );
};

export default Navbar;
