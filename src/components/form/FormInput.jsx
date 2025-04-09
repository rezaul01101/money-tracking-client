"use client";

import { getErrorMessageByPropertyName } from "@/src/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const FormInput = ({
  type = "text",
  name,
  id,
  placeholder,
  validation,
  label,
  required,
  defaultValue,
  serverError,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  // Get server error message for this field
  const serverErrorMessage = serverError?.find(
    (error) => error.path === name
  )?.message;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={validation}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className="relative">
            <input
              id={id}
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              className={`w-full text-sm py-2 pl-2 pr-10 border rounded-md focus:outline-none ${
                errorMessage || serverErrorMessage
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
              placeholder={placeholder}
              {...field}
              value={field.value || ""}
              required={required}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            )}
          </div>
        )}
      />
      {(errorMessage || serverErrorMessage) && (
        <div className="flex items-center mt-1">
          <span className="text-red-500 text-xs flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errorMessage || serverErrorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default FormInput;
