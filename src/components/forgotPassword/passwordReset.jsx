"use client";
import Link from "next/link";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import { toast } from "react-hot-toast";
export default function PasswordReset({handlePasswordReset}) {
  const onSubmit = (data) => {
    if(data.password !== data.confirm){
      toast.error("Password do not match");
      return;
    }
    handlePasswordReset(data?.password);
  };
  return (
    <div className="w-full md:w-1/2 flex items-center justify-center flex-col p-4">
      {/* OTP Form Container */}
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Reset Password
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Please enter your new password to securely reset your account access
        </p>

        {/* OTP Input Fields */}
        <Form submitHandler={onSubmit}>
          <div className="my-2">
          <FormInput
            label="New password"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="my-2"
            required
          />
          </div>
          <div className="my-4">
          <FormInput
            label="Confirm password"
            type="password"
            id="confirm"
            name="confirm"
            placeholder="Confirm Password"
            className="my-2"
            required
          />
          </div>
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              // onClick={handleOtp}
              // disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </Form>
          {/* Resend Link */}
          <p className="text-center text-gray-600 my-4">
            Do you remember your password?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              login
            </Link>
          </p>
      </div>
    </div>
  );
}
