"use client";
import { useState } from "react";
import IncomeModal from "@/src/components/modals/IncomeModal";
import ExpenseModal from "@/src/components/modals/ExpenseModal";
import TransactionList from "@/src/components/tables/TransactionList";
export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const [editTransaction, setEditTransaction] = useState(null);

  const handleEditTransaction = (data) => {
    console.log(data)
    if(data.type === "INCOME"){
      setEditTransaction(data);
      setIsModalOpen(true);
    }else{
      setEditTransaction(data);
      setIsExpenseModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header with Add Category Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions Overview</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpenseModalOpen(true)}
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
            Add <span className="hidden md:block">Expense</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 cursor-pointer"
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
            Add <span className="hidden md:block">Income</span>
          </button>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {/* Transaction List */}
        <TransactionList editHandler={handleEditTransaction} transactionType="FULL" />
      </div>

      {/* Modal */}
      <IncomeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editTransaction={editTransaction} />
      <ExpenseModal
        isModalOpen={isExpenseModalOpen}
        setIsModalOpen={setIsExpenseModalOpen}
        editTransaction={editTransaction}
      />

    </div>
  );
}
