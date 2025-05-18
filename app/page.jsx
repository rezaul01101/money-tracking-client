"use client";
import Nav from "@/src/components/Nav";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import heroImg from "@/public/hero.jpg"
import aboutImg from "@/public/about.webp"

export default function Home() {
  const [email,setEmail]= useState("");
  const handleSubmit=()=>{

  }
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Nav />

      <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* <div className="inline-block">
                <span className="px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-xs font-medium tracking-wider">
                  CONSULTANT
                </span>
              </div> */}

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
                 Take Full Control of Your Finances with a Smarter  <br/> Management Solution
                </h1>

                <p className="text-lg text-gray-600 max-w-md">
                Track income, monitor expenses, and plan your budget effortlessly — all from a single intuitive dashboard.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-500 text-white font-medium rounded-full hover:bg-purple-600 transition-colors"
                >
                  Get Started
                </button>
              </form>

              <div className="flex items-center gap-3">
                <div className="relative h-14 w-20">
                  <div className="absolute w-10 h-10 rounded-full bg-yellow-400 border-2 border-white left-0 top-0"></div>
                  <div className="absolute w-10 h-10 rounded-full bg-blue-400 border-2 border-white left-5 top-0"></div>
                  <div className="absolute w-10 h-10 rounded-full bg-red-400 border-2 border-white left-10 top-0"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4K+</div>
                  <div className="text-gray-600">users worldwide</div>
                </div>
              </div>
            </div>

            {/* Right Column - Image and Cards */}
            <div className="relative">
              {/* Credit Card Image */}
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image
                  src={heroImg}
                  alt="Credit cards"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>

              {/* Action Buttons */}
              <div className="absolute top-24 right-4 flex gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Send</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Request</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-200 rounded-lg flex items-center justify-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">More</span>
                </div>
              </div>

              {/* Balance Card */}
              <div className="absolute bottom-32 left-4 bg-orange-200 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="space-y-1">
                    <div className="h-1.5 w-16 bg-purple-400 rounded-full"></div>
                    <div className="h-1.5 w-16 bg-red-400 rounded-full"></div>
                    <div className="h-1.5 w-16 bg-yellow-400 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-700">Your balance</div>
                    <div className="font-bold">$7,065.00</div>
                  </div>
                  <div className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-black rounded"></div>
                    <div className="font-medium">Wallet</div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Income Card */}
              <div className="absolute bottom-8 right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex flex-col">
                  <div className="text-gray-500 text-sm mb-1">Total Income</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold">$ 18532.52</div>
                    <div className="bg-black text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      11%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* About Us Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image with Notifications */}
            <div className="relative">
              <div className="relative w-full h-[75vh] rounded-lg overflow-hidden">
                <Image
                  src={aboutImg}
                  alt="People using financial services"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Purple Logo Circle */}
              <div className="absolute top-1/4 right-0 transform translate-x-1/2 w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>

              {/* Received Notification */}
              <div className="absolute top-1/4 left-0 transform -translate-x-1/4 bg-green-100 p-4 rounded-lg shadow-lg w-48">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-200 rounded-full mb-2 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="User avatar"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="font-bold text-center">Received!</div>
                  <div className="absolute bottom-0 left-1/2 transform translate-x-1/2 translate-y-1/2 w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Transaction Notification */}
              <div className="absolute bottom-1/4 right-0 transform translate-x-1/4 bg-white p-4 rounded-lg shadow-lg w-64">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm">You just sent $50.00 to</div>
                    <div className="font-bold">Jenifer Lopez</div>
                  </div>
                </div>
              </div>

              {/* Dotted Line */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-1/2 border-t-2 border-dashed border-gray-300"></div>
            </div>

            {/* Right Column - Text Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-xs font-medium tracking-wider">
                  ABOUT US
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                 Designed to Make Your <br/> Financial Life Simple
                </h2>

                <p className="text-lg text-gray-600 max-w-lg">
               We built this app to help individuals and small businesses take control of their finances without the headache.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">AI-Powered Smart Expense Manager</h3>
                    <p className="text-gray-600">
                      Automatically categorizes your transactions and provides intelligent insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Detailed Daily & Monthly Reports</h3>
                    <p className="text-gray-600">
                     Understand where your money goes with clear visual breakdowns by day or month.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Flexible Budget Planner</h3>
                    <p className="text-gray-600">
                     Set goals, track spending, and stay within your planned budget with real-time alerts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Clean & User-Friendly Interface</h3>
                    <p className="text-gray-600">
                     Navigate with ease using an intuitive design focused on speed and clarity.
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-xs font-medium tracking-wider">
                  WHY CHOOSE US
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                 Why Choose Our <br/> Expense Manager?
                </h2>

                <p className="text-lg text-gray-600 max-w-lg">
                 Discover how our intelligent, user-focused platform goes beyond traditional tools to give you complete visibility, control, and confidence over your finances.
Whether you're an individual, freelancer, or small business, we’re built to help you save time, reduce stress, and make smarter financial decisions — every day.
Our combination of automation, insights, and simplicity is what sets us apart.
                </p>
              </div>

              <div>
                <button className="px-6 py-3 bg-purple-500 text-white font-medium rounded-full hover:bg-purple-600 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Column - Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Investor Relations */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-full h-full text-purple-500"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                    <circle cx="17" cy="12" r="3"></circle>
                    <path d="M18 10.7V10a2 2 0 0 0-2-2h-1.7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Intelligent Automation</h3>
                <p className="text-gray-600">
                  Reduce manual work with smart algorithms that handle categorization, tracking, and insights automatically.
                </p>
              </div>

              {/* Corporate calendar */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-full h-full text-purple-500"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Actionable Insights</h3>
                <p className="text-gray-600">
                 Understand your financial behavior with real-time analytics and easy-to-read reports that help you make informed decisions.
                </p>
              </div>

              {/* Sustainability */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-full h-full text-purple-500"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M12 22V12"></path>
                    <path d="M12 12L4.93 4.93"></path>
                    <path d="M12 12l7.07-7.07"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Budgeting</h3>
                <p className="text-gray-600">
                  Adapt your budget to your lifestyle. Whether you're planning monthly expenses or saving for long-term goals, you're in control.
                </p>
              </div>

              {/* Annual reporting */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-full h-full text-purple-500"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                    <line x1="3" y1="20" x2="21" y2="20"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Seamless User Experience</h3>
                <p className="text-gray-600">
                  From sign-up to daily use, every interaction is optimized for clarity, speed, and simplicity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6">About Us</h3>
                <p className="text-gray-400">
                  Short description about the company and its mission.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Connect</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </main>
  );
}


