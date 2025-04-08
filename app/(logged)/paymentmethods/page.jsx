"use client";
import { FiTrash, FiEdit } from "react-icons/fi";
import PaymentMethodModal from "@/src/components/modals/PaymentMethodModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCategoryDeleteMutation,
} from "@/src/redux/api/categoryApi";
import DeleteModal from "@/src/components/modals/DeleteModal";
import { usePaymentMethodListQuery } from "@/src/redux/api/paymentMethodApi";
export default function CategoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const { data: methods, isLoading } = usePaymentMethodListQuery();

  const [categoryDelete] = useCategoryDeleteMutation();
  const { currency } = useSelector((state) => state.settings);
  const deleteHandler = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteCategoryId(id);
  };

  const deleteCategory = async (id) => {
    const response = await categoryDelete(id);
    console.log("Deleting category with ID:", response);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header with Add Category Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Methods Overview</h1>
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
          Add Payment Method
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Income Card */}
        {methods?.map((method) => (
          <div
            key={method?.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-700 text-lg font-medium">
                {method.name}
              </h2>
              <span className="px-3 py-1 bg-[#40E0D0] text-white text-sm font-medium rounded-md">
                {method?.type}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Available Balance</p>
                <p className="text-xl font-semibold text-gray-900">
                  {currency} {new Intl.NumberFormat().format((method.initialAmount + method?.balance))}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteHandler(method?.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                >
                  <FiTrash size={18} />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50">
                  <FiEdit size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <PaymentMethodModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {/* Delete Modal */}
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteId={deleteCategoryId}
        onDelete={deleteCategory}
      />
    </div>
  );
}
