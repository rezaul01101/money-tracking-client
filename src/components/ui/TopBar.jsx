"use client";
import { useAuth } from "@/src/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const TopBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40">
        <div
          className={`flex items-center justify-between h-full px-4 ${
            isSidebarOpen ? "md:pl-4" : "md:pl-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="hidden md:block">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="ml-2 text-xl font-semibold">Money Manager</span>
            </div>
            </div>
            {/* Left section with mobile menu button */}
            <div className="flex items-center md:pl-18">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center md:space-x-2 justify-center focus:outline-none md:pr-4 cursor-pointer"
              >
                <div className="rounded-full bg-gray-200 flex items-center justify-center">
                  {userInfo?.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${userInfo?.image}`}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="rounded-full object-cover w-[40px] h-[40px]"
                    />
                  ) : (
                    <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-2xl">{userInfo?.name?.[0]}</span>
                    </div>
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {userInfo?.name}
                </span>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  {/* <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a> */}
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
