"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { useState } from "react";
import LeftSidebar from "@/src/components/ui/LeftSidebar";
import TopBar from "@/src/components/ui/TopBar";
import { AuthProvider } from "@/src/context/AuthContext";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Top Bar */}
        <TopBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Sidebar */}
        <LeftSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content */}
        <div
          className={`pt-16 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "md:pl-64" : "md:pl-0"
          }`}
        >
          <main className="p-4 md:p-8">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
