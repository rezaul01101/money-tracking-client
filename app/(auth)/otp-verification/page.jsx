"use client";

import {
  useVerifyOtpMutation,
  useResetPasswordMutation,
} from "@/src/redux/api/authApi";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { toast } from "react-hot-toast";
import VerificationOtp from "@/src/components/forgotPassword/VerificationOtp";
import PasswordReset from "@/src/components/forgotPassword/passwordReset";

const OTPVerification = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPVerificationContent />
    </Suspense>
  );
};

const OTPVerificationContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "rezaulhoque0101@gmail.com";
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verifyOtp] = useVerifyOtpMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async (otpValue) => {
    try {
      const data = {
        email: email,
        otp: otpValue,
      };
      const res = await verifyOtp(data).unwrap();
      if (res) {
        setOtp(otpValue);
        setIsVerified(true);
        toast.success("OTP verified successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (password) => {
    try {
      const data = {
        email: email,
        password: password,
        otp: otp,
      };
      const res = await resetPassword(data).unwrap();
      if (res) {
        toast.success("Password reset successfully!");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error?.message || "Password reset failed");
    }
  };

  const handleResend = () => {
    toast.success("New OTP sent successfully!");
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-1/2 max-h-screen hidden md:block">
        <Image
          src="https://images.pexels.com/photos/5474298/pexels-photo-5474298.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Login"
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center flex-col p-4">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-3xl font-bold">Money Management App</span>
        </div>

        {isVerified ? (
          <PasswordReset handlePasswordReset={handlePasswordReset} />
        ) : (
          <VerificationOtp email={email} handleVerify={handleVerify} />
        )}
      </div>
    </div>
  );
};

export default OTPVerification;
