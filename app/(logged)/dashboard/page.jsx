"use client";
import { useAuth } from "@/src/context/AuthContext";
import { useSelector } from "react-redux";
import { useDashboardQuery } from '@/src/redux/api/dashboardApi';


import BarChartComponent from "@/src/components/charts/BarChart";

export default function Dashboard() {
  const { data } = useDashboardQuery();
  const { currency } = useSelector((state) => state.settings);
  const { user, logout } = useAuth();

  const convertToCurrency=(amount)=>{
    const formattedBDT = new Intl.NumberFormat('en-BD', {
      maximumFractionDigits: 2,
    }).format(amount);
    return formattedBDT;
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Income Card */}
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              +12.5%
            </span>
          </div>
          <h2 className="text-gray-500 text-sm mb-1">Income</h2>
          <p className="text-2xl font-bold text-gray-900">
            {currency}{convertToCurrency( data?.income?.currentMonth)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Compared to {currency}{convertToCurrency(data?.income?.lastMonth)} last month
          </p>
        </div>

        {/* Expense Card */}
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
              +8.2%
            </span>
          </div>
          <h2 className="text-gray-500 text-sm mb-1">Expenses</h2>
          <p className="text-2xl font-bold text-gray-900">{currency}28,650</p>
          <p className="text-sm text-gray-500 mt-2">
            Compared to $26,500 last month
          </p>
        </div>

        {/* Savings Card */}
        {/* <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
              +5.3%
            </span>
          </div>
          <h2 className="text-gray-500 text-sm mb-1">Savings</h2>
          <p className="text-2xl font-bold text-gray-900">{currency}14,650</p>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="text-gray-700 font-medium">73%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "73%" }}
              ></div>
            </div>
          </div>
        </div> */}

        {/* Balance Card */}
        {/* <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
              Net Worth
            </span>
          </div>
          <h2 className="text-gray-500 text-sm mb-1">Total Balance</h2>
          <p className="text-2xl font-bold text-gray-900">{currency}128,950</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Assets</div>
              <div className="text-sm font-medium">{currency}158,000</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Liabilities</div>
              <div className="text-sm font-medium">$29,050</div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="w-full p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow mt-5">
        <p className="text-xl text-gray-500 mb-4 text-center">
          Full year income expense report
        </p>
        <BarChartComponent />
      </div>
    </div>
  );
}
