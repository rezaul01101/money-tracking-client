"use client";
import React, { useState } from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiRepeat,
  FiTrash,
  FiEdit,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  useTransactionListByTypeQuery,
  useTransactionDeleteMutation,
} from "@/src/redux/api/transactionApi";
import { useSelector } from "react-redux";
import ListLoadingPlaceholder from "./ListLoadingPlaceholder";
import DeleteModal from "@/src/components/modals/DeleteModal";
import { toast } from "react-hot-toast";
import {
  storeTransactionEditData,
  storeTranssactionType,
} from "@/src/redux/features/transactionSlice";
import Pagination from "../pagination/Pagination";

const TransactionList = ({ transactionType = null }) => {
  const dispatch = useDispatch();
 

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { currency } = useSelector((state) => state.settings);
  const { data: transactions, isLoading } = useTransactionListByTypeQuery({
    type: transactionType,
    page: currentPage,
    limit: pageSize,
  });
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

  const deleteData = async (id) => {
    const response = await transactionDelete(id);
    if (response.error) {
      toast.error(response.error.data.message);
    } else {
      toast.success("Transaction deleted successfully");
    }
  };

  const handleEditTransaction = (data) => {
    dispatch(storeTransactionEditData(data));
    dispatch(storeTranssactionType(data?.type));
  };

  return (
    <div className="overflow-x-auto max-w-full">
      <table className="max-w-full">
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
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading
            ? // Loading rows
              [...Array(5)].map((_, index) => (
                <ListLoadingPlaceholder key={index} />
              ))
            : transactions?.data?.map((transaction) => (
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
                      className={`text-sm font-bold ${
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
                      {transaction?.category?.name
                        ? transaction.category.name
                        : ""}
                    </b>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => deleteHandler(transaction?.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-full cursor-pointer"
                      >
                        <FiTrash size={18} />
                      </button>
                      <button
                        onClick={() => handleEditTransaction(transaction)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full cursor-pointer"
                      >
                        <FiEdit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

    <Pagination  
      listOfItems={transactions} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      pageSize={pageSize}
    />

      {/* Delete Modal */}
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteId={deleteId}
        onDelete={deleteData}
      />
    </div>
  );
};

export default TransactionList;