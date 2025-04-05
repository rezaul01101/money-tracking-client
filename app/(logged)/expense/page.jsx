"use client";
import { FiTrash, FiEdit } from "react-icons/fi";
import { useState } from "react";
import { useCategoryListQuery } from "@/src/redux/api/categoryApi";
import DeleteModal from "@/src/components/modals/DeleteModal";
import ExpenseModal from "@/src/components/modals/ExpenseModal";
import TransactionList from "@/src/components/tables/TransactionList";
export default function ExpensePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: categories, isLoading } = useCategoryListQuery();
  
  const deleteHandler = (id) => {
    setIsDeleteModalOpen(true);
  };

  const deleteCategory = async (id) => {
    const response = await categoryDelete(id);
    console.log("Deleting category with ID:", response);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header with Add Category Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Expense Overview</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Expense
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {/* Transaction List */}
        <TransactionList transactionType="EXPENSE" />
      </div>

      {/* Modal */}
      <ExpenseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {/* Delete Modal */}
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteId={1}
        onDelete={deleteCategory}
      />
    </div>
  );
}
