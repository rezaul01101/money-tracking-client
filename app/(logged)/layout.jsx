"use client";

import { useEffect, useState } from "react";
import LeftSidebar from "@/src/components/ui/LeftSidebar";
import TopBar from "@/src/components/ui/TopBar";
import { AuthProvider } from "@/src/context/AuthContext";
import { useGetUserQuery } from "@/src/redux/api/userApi";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "@/src/redux/features/user/userSlice";

export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  const { data: user } = useGetUserQuery();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(storeUserInfo(user));
  }, [user]);

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 768);
  }, []);

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
