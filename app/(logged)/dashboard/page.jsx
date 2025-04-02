"use client";
import { useAuth } from "@/src/context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Dashboard content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Welcome</h2>
          <p className="text-gray-600">
            You are logged in with token: {user?.token}
          </p>
        </div>
      </div>
    </div>
  );
}
