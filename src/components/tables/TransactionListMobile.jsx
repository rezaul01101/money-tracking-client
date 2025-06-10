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
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm gap-2 my-2"
            key={transaction?.id}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                {getTypeIcon(transaction.type)}
              </div>
              <div>
                <p className="text-xs text-gray-400">   {new Date(transaction.date).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}</p>
                <p className="text-sm font-medium text-gray-900">
                 {transaction?.paymentMethod?.name}
                </p>
                <p className="text-xs font-normal text-gray-900">
                    {transaction.type}
                </p>
              </div>
            </div>
            <div className="text-sm font-semibold text-red-500">
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
            </div>
          </div>
        ))
      )}

      {/* <Pagination
        listOfItems={transactions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
      /> */}

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
