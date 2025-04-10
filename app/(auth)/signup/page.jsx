"use client";
import Form from "@/src/components/form/Form";
import FormInput from "@/src/components/form/FormInput";
import { useUserSignupMutation } from "@/src/redux/api/authApi";
import { isLoggedIn, storeUserInfo } from "@/src/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [userSignup] = useUserSignupMutation();
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState([]);
  const [message, setMessage] = useState(false);

  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     router.push("/dashboard");
  //   }
  // }, [router]);

  const onSubmit = async (data) => {
    try {
      setServerErrors([]); // Clear previous errors
      const res = await userSignup(data).unwrap();
      if (res) {
        setMessage(true);
        toast.success("Registration successful! Please check your email to verify your account.");
      }
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
        {message ? (
          <div className="w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Verification Email Sent</h2>
            <p className="text-gray-600 mb-4">
              We have sent a verification link to your email address. Please
              check your inbox and click the link to verify your account.
            </p>
            <p className="text-gray-500 text-sm">
              If you don't see the email, please check your spam folder.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block text-black font-medium hover:underline"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-2 text-center">
              Create free account
            </h1>
            <p className="text-gray-600 mb-8 text-center">
              Enter your details below to create your account
            </p>
            <Form submitHandler={onSubmit}>
              <div className="space-y-4">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                    validation={{
                      required: "Name is required",
                    }}
                    serverError={serverErrors}
                  />
                </div>
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

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium"
                    >
                      Password
                    </label>
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
                        value: 8,
                        message: "Password must be at least 8 characters",
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
                  Sign up
                </button>
              </div>
            </Form>
            {/* Sign Up Link */}
            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-black font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
