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

const TransactionListMobile = ({ transactionType = null }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(30);

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
    <div className="max-w-full">
      {isLoading ? (
        // Loading rows
        <p>loading...</p>
      ) : (
        transactions?.data?.map((transaction) => (
          <div
            className=" p-4 bg-white rounded-lg shadow-sm gap-2 my-2 relative"
            key={transaction?.id}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">
                      {" "}
                      {new Date(transaction.date).toLocaleString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction?.paymentMethod?.name}
                    </p>
                    <p className="text-xs font-normal text-gray-900">
                      {transaction.type}
                    </p>
                  </div>
                 </div>
                  <div className="text-md text-center mt-2 hidden md:block">
                  {transaction.type === "EXPENSE"
                    ? `Sending money to `
                    : `Received money from `}
                  <b>
                    {transaction?.category?.name ? transaction.category.name : ""}
                  </b>
                </div>
                 <div className="text-sm font-semibold text-red-500 flex items-end h-12">
                  <div
                    className={` text-md font-bold ${
                      transaction.type === "EXPENSE"
                        ? "text-gray-900"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "EXPENSE" ? "- " : "+ "}
                    {currency}
                    {new Intl.NumberFormat().format(transaction.amount)}
                  </div>
                  </div>
                  <div className="flex items-center absolute right-2 top-2 space-x-1">
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
            </div>
             <div className="text-md text-left mt-2 block md:hidden">
              {transaction.type === "EXPENSE"
                ? `Sending money to `
                : `Received money from `}
              <b>
                {transaction?.category?.name ? transaction.category.name : ""}
              </b>
            </div>
          </div>
        ))
      )}

      <div className="overflow-x-scroll w-[95vw] md:w-full">
        <Pagination
          listOfItems={transactions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
        />
      </div>

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

export default TransactionListMobile;
