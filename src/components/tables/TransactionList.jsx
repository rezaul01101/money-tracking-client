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

const TransactionList = ({ transactionType = null }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);

  const [editTransaction, setEditTransaction] = useState(null);
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = transactions?.meta?.total
    ? Math.ceil(transactions.meta.total / pageSize)
    : 0;

  const getPaginationRange = (currentPage, totalPages) => {
    const range = [];
    const maxVisiblePages = 6; // Number of pages to show on each side
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    // Always show first page
    range.push(1);

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total pages are less than max visible + 2 (for ellipsis)
      for (let i = 2; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Determine when to show left ellipsis
      if (currentPage > halfVisiblePages + 2) {
        range.push("...");
      }

      // Calculate start and end of middle range
      let start = Math.max(2, currentPage - halfVisiblePages);
      let end = Math.min(totalPages - 1, currentPage + halfVisiblePages);

      // Adjust if we're near the beginning
      if (currentPage <= halfVisiblePages + 1) {
        end = maxVisiblePages;
      }
      // Adjust if we're near the end
      else if (currentPage >= totalPages - halfVisiblePages) {
        start = totalPages - maxVisiblePages + 1;
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          range.push(i);
        }
      }

      // Determine when to show right ellipsis
      if (currentPage < totalPages - halfVisiblePages - 1) {
        range.push("...");
      }
    }

    // Always show last page if there's more than 1 page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium">
                {Math.min(
                  currentPage * pageSize,
                  transactions?.meta?.total || 0
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {transactions?.meta?.total || 0}
              </span>{" "}
              results
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <span>←</span>
              </button>

              <div className="flex space-x-1">
                {getPaginationRange(currentPage, totalPages).map(
                  (page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-2 py-1 text-gray-500 cursor-default">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded-md min-w-[32px] ${
                            currentPage === page
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

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