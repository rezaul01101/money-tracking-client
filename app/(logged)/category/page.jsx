"use client";
import { FiTrash, FiEdit } from "react-icons/fi";
import CategoryModal from "@/src/components/modals/CategoryModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCategoryDeleteMutation,
  useCategoryListQuery,
} from "@/src/redux/api/categoryApi";
import DeleteModal from "@/src/components/modals/DeleteModal";
export default function CategoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const { data: categories, isLoading } = useCategoryListQuery();
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
        <h1 className="text-2xl font-bold">Financial Overview</h1>
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
          Add Category
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Income Card */}
        {categories?.map((category) => (
          <div
            key={category?.id}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className={`w-6 h-6 ${
                    category?.type == "INCOME"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
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
              <span
                className={`px-2.5 py-1 ${
                  category?.type == "INCOME" ? "bg-green-50" : "bg-red-100"
                } text-blue-700 text-xs font-medium rounded-full`}
              >
                {category?.type}
              </span>
            </div>
            <h2 className="text-gray-500 text-sm mb-1">{category.name}</h2>
            <p className="text-2xl font-bold text-gray-900">{currency}0,00</p>
            <div className="flex gap-3 mt-3">
              <div
                onClick={() => deleteHandler(category?.id)}
                className="cursor-pointer text-xl text-red-300 hover:text-red-600"
              >
                <FiTrash />
              </div>
              <div className="cursor-pointer text-xl text-gray-400 hover:text-gray-600">
                <FiEdit />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <CategoryModal
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
