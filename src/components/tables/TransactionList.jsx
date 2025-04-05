import React from "react";
import { FiArrowUp, FiArrowDown, FiRepeat } from "react-icons/fi";
import { useTransactionListByTypeQuery } from "@/src/redux/api/transactionApi";
import { useSelector } from "react-redux";

const TransactionList = ({ transactionType = null }) => {
  const { currency } = useSelector((state) => state.settings);

  const { data: transactions, isLoading } =
    useTransactionListByTypeQuery(transactionType);

  // Mock data for demonstration
  // const transactions = [
  //   {
  //     id: 1,
  //     type: "sent",
  //     amount: "500.00 IDR",
  //     secondaryAmount: null,
  //     paymentMethod: "Credit Card",
  //     paymentDetails: "**** 6969",
  //     status: "success",
  //     activity: "Sending money to Raihan Fikri",
  //   },
  //   {
  //     id: 2,
  //     type: "sent",
  //     amount: "200,000 IDR",
  //     secondaryAmount: "20 USD",
  //     paymentMethod: "Wire Transfer",
  //     paymentDetails: "**** 9830",
  //     status: "success",
  //     activity: "Sending money to Bani Zuhilmin",
  //   },
  //   {
  //     id: 3,
  //     type: "received",
  //     amount: "1,500 USD",
  //     secondaryAmount: null,
  //     paymentMethod: "Bank Transfer",
  //     paymentDetails: "**** 6663",
  //     status: "success",
  //     activity: "Received money from Andrew",
  //   },
  //   {
  //     id: 4,
  //     type: "received",
  //     amount: "2,500 USD",
  //     secondaryAmount: null,
  //     paymentMethod: "PayPal",
  //     paymentDetails: "@claristaj",
  //     status: "success",
  //     activity: "Payment for product",
  //   },
  //   {
  //     id: 5,
  //     type: "received",
  //     amount: "1,500 USD",
  //     secondaryAmount: null,
  //     paymentMethod: "Payoneer",
  //     paymentDetails: "**** 1083",
  //     status: "incomplete",
  //     activity: "Payment for invoice",
  //   },
  //   {
  //     id: 6,
  //     type: "converted",
  //     amount: "400,000 IDR",
  //     secondaryAmount: "40 USD",
  //     paymentMethod: "Debit Card",
  //     paymentDetails: "**** 2833",
  //     status: "failed",
  //     activity: "Convert money from USD to IDR",
  //   },
  // ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "EXPENSE":
        return <FiArrowUp className="text-pink-500" />;
      case "INCOME":
        return <FiArrowDown className="text-green-500" />;
      case "converted":
        return <FiRepeat className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "success":
        return (
          <span className={`${baseClasses} bg-green-50 text-green-700`}>
            Success
          </span>
        );
      case "incomplete":
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-700`}>
            Incomplete
          </span>
        );
      case "failed":
        return (
          <span className={`${baseClasses} bg-red-50 text-red-700`}>
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Activity
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions?.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div className="flex flex-col">
                    <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
                      {transaction.type}
                    </span>
                    <span className="ml-2 text-sm text-pink-500">
                      {new Date(transaction.date).toLocaleString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className={`text-sm font-bold text-gray-900`}
                >
                  {transaction.type === "EXPENSE" ? "- " : "+ "}
                 {currency}{new Intl.NumberFormat().format(transaction.amount)}
                </div>
                {transaction.secondaryAmount && (
                  <div className="text-sm text-gray-500">
                    {transaction.secondaryAmount}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {transaction.paymentMethod}
                </div>
                <div className="text-sm text-gray-500">
                  {transaction.paymentDetails}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.notes}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.type === "EXPENSE"
                  ? `Sending money to `
                  : `Received money from `}
                <b>
                  {transaction?.category?.name ? transaction.category.name : ""}
                </b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
