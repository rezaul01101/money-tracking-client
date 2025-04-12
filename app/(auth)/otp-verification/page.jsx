"use client";
import Form from "@/src/components/form/Form";
import FormInput from "@/src/components/form/FormInput";
import { useForgotPasswordMutation } from "@/src/redux/api/authApi";
import { isLoggedIn, storeUserInfo } from "@/src/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function OTPVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "",""]);
  const [loading, setLoading] = useState(false);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value !== "" && index < 4) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle verification
  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      toast.error("Please enter a valid OTP");
      return;
    }
    setLoading(true);
    try {
      // Add your verification logic here
      toast.success("OTP verified successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle resend
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
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          {/* <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="text-white">A</div>
          </div> */}
          <span className="text-3xl font-bold">Money Management App</span>
        </div>

        {/* OTP Form Container */}
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Enter verification code
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            We've sent a code to hello@alignui.com
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-4 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-14 h-14 text-center text-2xl border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            ))}
          </div>

          {/* Resend Link */}
          <p className="text-center text-gray-600 mb-6">
            Didn't get a code?{" "}
            <button
              onClick={handleResend}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Click to resend
            </button>
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => router.back()}
              className="w-full bg-white text-black border py-2 rounded-lg  transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
