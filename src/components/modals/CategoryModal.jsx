"use client";
import FormInput from "../form/FormInput";
import Form from "../form/Form";
import FormSelect from "../form/FormSelect";
import { useCategoryCreateMutation } from "@/src/redux/api/categoryApi";

const CategoryModal = ({ isModalOpen, setIsModalOpen }) => {
  const [categoryCreate] = useCategoryCreateMutation();
  const onSubmit = async (data) => {
    const res = await categoryCreate(data).unwrap();
    console.log(res);

    setIsModalOpen(false);
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0000008a] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Category</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Form submitHandler={onSubmit}>
              <div className="space-y-4">
                {/* Category Name */}
                <div>
                  <FormInput
                    label={"Category Name"}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Category Type */}
                <div>
                  <FormSelect
                    label={"Category Type"}
                    id="type"
                    name="type"
                    placeholder="Select Type"
                    options={[
                      { label: "Expense", value: "EXPENSE" },
                      { label: "Income", value: "INCOME" },
                      { label: "Savings", value: "SAVING" },
                      { label: "Investment", value: "INVESTMENT" },
                    ]}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
                  >
                    Create Category
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryModal;
