"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100); // Trigger sticky behavior after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Placeholder to prevent layout jump when navbar becomes fixed */}
      {isScrolled && (
        <div className="px-4 md:px-10 lg:px-10 py-3">
          <div className="h-16"></div>
        </div>
      )}
      
      <div 
        className={`px-4 md:px-10 lg:px-10 py-3 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? "fixed top-0 left-0 right-0 z-50 shadow-lg transform translate-y-0" 
            : "relative"
        }`}
        style={isScrolled ? {
          backgroundColor: 'rgba(10, 10, 10, 0.20)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        } : {}}
      >
        <div className="flex flex-row justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex item-center gap-2">
              <h1
                className={`text-xl font-semibold ${poppins.className} hidden lg:block md:block transition-all duration-400 ${
                  isScrolled ? "transform scale-95" : ""
                }`}
                style={isScrolled ? { color: "#ffffff" } : { color: "#15494A" }}
              >
                Bracket AI
              </h1>
            </Link>
            <Image 
              src="/logo.PNG" 
              alt="Bracket AI" 
              width={50} 
              height={50}
              className={`transition-all duration-300 ${
                isScrolled ? "transform scale-90" : ""
              }`}
            />
          </div>
          <div
            className={`flex flex-row items-center font-medium gap-3 md:gap-5 lg:gap-5 ${poppins.className}`}
            style={isScrolled ? { color: "#ffffff" } : { color: "#15494A" }}
          >
            <Link 
              href="/" 
              className="hover:opacity-70 transition-all duration-200 hover:transform hover:scale-105"
            >
              <h1>About</h1>
            </Link>
            <Link
              href="/contactus"
              className="hover:opacity-70 transition-all duration-200 hover:transform hover:scale-105"
            >
              <h1>Contact</h1>
            </Link>
            <Link
              href="/contactus"
              className="hover:opacity-70 transition-all duration-200 hover:transform hover:scale-105"
            >
              <h1>Dashboard</h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
