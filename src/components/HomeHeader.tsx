import React from "react";
import Image from "next/image";
import logo from "../assets/logo.jpg";
import Navbar from "./Navbar";

const HomeHeader = () => {
  return (
    <header id="header" className="relative">
      <Navbar />
      <Image
        className="h-screen w-full object-cover animate-fade-down animate-once animate-duration-800 animate-delay-800 z-0"
        src={logo}
        alt="logo"
      />
    </header>
  );
};

export default HomeHeader;
