"use client";

import { getErrorMessageByPropertyName } from "@/src/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";

const FormSelect = ({
  name,
  id,
  placeholder,
  validation,
  label,
  required,
  options = [],
  defaultValue = "",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="mb-2">
      <label htmlFor={id} className="text-sm mb-2">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <select
            id={id}
            className="w-full text-sm py-2 pl-2 border focus:border-black focus:outline-none rounded-md"
            {...field}
            required={required}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormSelect;
