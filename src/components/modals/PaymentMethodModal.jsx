"use client";
import FormInput from "../form/FormInput";
import Form from "../form/Form";
import FormSelect from "../form/FormSelect";
import FormTextarea from "../form/FormTextarea";
  import { usePaymentMethodCreateMutation } from "@/src/redux/api/paymentMethodApi";
import toast from "react-hot-toast";

const PaymentMethodModal = ({ isModalOpen, setIsModalOpen }) => {


  const paymentMethodType=[
    "Cash",
    "Card",
    "GiftCard",
    "ThirdParty",
    "MobilePay",
    "Other",
    "BankTransfer",
    "HouseAccount"
  ];

  const [paymentMethodCreate] = usePaymentMethodCreateMutation();
  const onSubmit = async (data) => {
    try{
      const res = await paymentMethodCreate(data).unwrap();
      toast.success("Payment Method Created Successfully");
    }catch(error){
      toast.error("Payment Method Creation Failed");
    }
  
    setIsModalOpen(false);
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0000008a] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add Payment Method</h2>
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
            <Form
              submitHandler={onSubmit}
              defaultValues={{
                name: "",
                amount: 0,
                paymentType: "Cash",
                notes: "",
              }}
            >
              <div className="space-y-4">
                {/* Category Name */}
                <div>
                  <FormInput
                    label={"Payment Method Name"}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <FormInput
                    label={"Initial Balance"}
                    type="number"
                    id="initialBalance"
                    name="amount"
                    placeholder="Initial Balance"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                
                {/* Category Type */}
                <div>
                  <FormSelect
                    label={"Payment Method Type"}
                    id="type"
                    name="paymentType"
                    placeholder="Select Type"
                    options={paymentMethodType?.map((type) => ({
                      label: type,
                      value: type,
                    }))}
                  />
                </div>
                <div>
                  <FormTextarea
                    label={"Notes"}
                    id="notes"
                    name="notes"
                    placeholder="Notes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
                    Save 
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

export default PaymentMethodModal;
