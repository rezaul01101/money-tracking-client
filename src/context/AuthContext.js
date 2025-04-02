"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authKey } from "../constants/storageKey";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by verifying token in localStorage
    const token = localStorage.getItem(authKey);
    if (token) {
      // You can add token verification logic here
      setUser({ token });
    } else {
      console.log("No token found");  
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  const login = (token) => {
    localStorage.setItem(authKey, token);
    setUser({ token });
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem(authKey);
    setUser(null);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
