"use client";
import { useVerifyOtpMutation } from "@/src/redux/api/authApi";
import {useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";


const ListLoadingPlaceholder=()=> {
  return (
    <tr className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex flex-col ml-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 mt-1"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </td>
              </tr>
  );
}

export default ListLoadingPlaceholder;
