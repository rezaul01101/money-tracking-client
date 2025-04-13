"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useEmailVerificaitonTokenMutation } from "@/src/redux/api/authApi";
import { toast } from "react-hot-toast";

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const [isVerified, setIsVerified] = useState(false);
  const [emailVerificaitonToken] = useEmailVerificaitonTokenMutation();

  useEffect(() => {
    const verifyEmailFetch = async () => {
      if (!token) return;

      try {
        const res = await emailVerificaitonToken({ token }).unwrap();
        if (res) {
          setIsVerified(true);
        }
      } catch (error) {
        setIsVerified(false);
        toast.error(error?.data?.message || "Token is not valid");
      }
    };

    verifyEmailFetch();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {isVerified ? (
        <div className="flex flex-col items-center justify-center px-4">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-8">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">
            Email Verified
          </h1>
          <p className="text-gray-600 text-xl text-center mb-8">
            Congratulations! Your email has been successfully verified.
          </p>
          <Link
            href="/login"
            className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Continue to App
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Email Not Verified
          </h1>
          <p className="text-gray-600 text-xl text-center mb-8">
            Please check your email for verification.
          </p>
          <Link
            href="/"
            className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Back to home
          </Link>
        </div>
      )}
    </div>
  );
};
