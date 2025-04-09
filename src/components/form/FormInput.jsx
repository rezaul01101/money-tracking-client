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
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

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
              className="w-full text-sm py-2 pl-2 pr-10 border focus:border-black focus:outline-none rounded-md"
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
      {errorMessage && (
        <span className="text-red-500 text-xs mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormInput;
