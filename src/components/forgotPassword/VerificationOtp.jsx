"use client";
import { useVerifyOtpMutation } from "@/src/redux/api/authApi";
import {useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";


export default function VerificationOtp({email,handleVerify}) {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verifyOtp] = useVerifyOtpMutation();

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
  const handleOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 5) {
      toast.error("Please enter a valid OTP");
      return;
    }
    handleVerify(otpValue)
  };

  // Handle resend
  const handleResend = () => {
    toast.success("New OTP sent successfully!");
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center flex-col p-4">
      {/* OTP Form Container */}
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Enter verification code
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          {` We've sent a code to ${email} for 5 minutes`}
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
          <Link
            href="/login"
            className="w-full text-center bg-white text-black border py-2 rounded-lg  transition-colors cursor-pointer"
          >
            Cancel
          </Link>
          <button
            onClick={handleOtp}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
}
