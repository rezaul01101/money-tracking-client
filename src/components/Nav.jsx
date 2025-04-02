"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="container mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <div className="text-white font-bold">A</div>
              </div>
              <span className="text-xl font-medium">Acme Inc.</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition"
              >
                Contact
              </Link>
              <Link
                href={"/login"}
                className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-700 transition"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} pb-4`}>
            <div className="flex flex-col gap-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-pink-500 transition px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Contact
              </Link>
              <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition mx-4">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
