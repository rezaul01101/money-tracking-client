"use client";
import React, { useState } from "react";
import { FiArrowUp, FiArrowDown, FiRepeat,FiTrash } from "react-icons/fi";

import {useTransactionListByTypeQuery,useTransactionDeleteMutation} from "@/src/redux/api/transactionApi";
import { useSelector } from "react-redux";
import ListLoadingPlaceholder from "./ListLoadingPlaceholder";
import DeleteModal from "@/src/components/modals/DeleteModal";
import { toast } from "react-hot-toast";

const TransactionList = ({ transactionType = null }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { currency } = useSelector((state) => state.settings);
  const { data: transactions, isLoading } =
    useTransactionListByTypeQuery(transactionType);
    const [transactionDelete] = useTransactionDeleteMutation();


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

  const deleteHandler = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteId(id);
  };

  const deleteTransaction = async (id) => {
    const response = await transactionDelete(id);
    if(response.error){
      toast.error(response.error.data.message);
    }else{
      toast.success("Transaction deleted successfully");
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
          {isLoading ? (
            // Loading rows
            [...Array(5)].map((_, index) => (
              <ListLoadingPlaceholder key={index} />
            ))
          ) : (
            transactions?.map((transaction) => (
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
                    className={`text-sm font-bold  ${
                      transaction.type === "EXPENSE"
                        ? "text-gray-900"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "EXPENSE" ? "- " : "+ "}
                    {currency}
                    {new Intl.NumberFormat().format(transaction.amount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction?.paymentMethod?.name}
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
                <td>
                    <div onClick={() => deleteHandler(transaction?.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-full cursor-pointer">
                      <FiTrash size={18} />
                    </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

       {/* Delete Modal */}
       <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteId={deleteId}
        onDelete={deleteTransaction}
      />
    </div>
  );
};

export default TransactionList;
