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

export default function Signup() {
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState([]);
  const [message, setMessage] = useState(false);



  const onSubmit = async (data) => {
    try {
      // setServerErrors([]); // Clear previous errors
      const res = await forgotPassword(data).unwrap();
      console.log(res)
      // if (res) {
      //   setMessage(true);
      //   toast.success("Registration successful! Please check your email to verify your account.");
      // }
      // console.log(res)
      // if (res?.accessToken) {
      //   storeUserInfo({ accessToken: res?.accessToken });
      //   router.push("/dashboard");
      //   toast.success("User logged in successfully!");
      // }
    } catch (error) {
      if (error?.data?.errorMessages) {
        // Handle server validation errors
        setServerErrors(error.data.errorMessages);
        toast.error(error?.data?.message);
      } else {
        // Handle other types of errors
        const errorMessage =
          error?.data?.message || "Login failed. Please try again.";
        toast.error(errorMessage);
      }
    }
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
        {/* Logo and Company Name */}
        <div className="flex items-center gap-2 mb-8">
          {/* <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="text-white">A</div>
          </div> */}
          <span className="text-3xl font-bold">Money Management App</span>
        </div>

        {/* Login Form Container */}
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-2 text-center">
              Forgot your password?
            </h1>
            <p className="text-gray-600 mb-8 text-center">
              Enter your email below to reset your password
            </p>
            <Form submitHandler={onSubmit}>
              <div className="space-y-4">
                {/* Email Input */}
                
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                    validation={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    serverError={serverErrors}
                  />
                </div>


                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Send email
                </button>
              </div>
            </Form>
            {/* Sign Up Link */}
            <p className="mt-6 text-center text-gray-600">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-black font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
}
