"use client";
import Form from "@/src/components/form/Form";
import FormInput from "@/src/components/form/FormInput";
import { useUserLoginMutation } from "@/src/redux/api/authApi";
import { isLoggedIn, storeUserInfo } from "@/src/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Login() {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState([]);

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    }
  }, [router]);

  const onSubmit = async (data) => {
    try {
      setServerErrors([]); // Clear previous errors
      const res = await userLogin(data).unwrap();
      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
        toast.success("User logged in successfully!");
      }
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
          src="https://images.pexels.com/photos/6266774/pexels-photo-6266774.jpeg?auto=compress&cs=tinysrgb&w=1200"
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
            Login to your account
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Enter your email below to login to your account
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
                  placeholder="email"
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

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormInput
                  name="password"
                  type="password"
                  id="password"
                  placeholder="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  validation={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
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
                Login
              </button>
            </div>
          </Form>

          {/* Divider */}
          {/* <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div> */}

          {/* GitHub Login Button */}
          {/* <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z"
              clipRule="evenodd"
            />
          </svg>
          Login with GitHub
        </button> */}

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-black font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
