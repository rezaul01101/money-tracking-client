"use client";

import { getErrorMessageByPropertyName } from "@/src/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";

const FormTextarea = ({
  name,
  id,
  placeholder,
  validation,
  label,
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="mb-1">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue="" // Add default value to prevent uncontrolled to controlled warning
        render={({ field }) => (
          <textarea
            id={id}
            className="w-full text-sm py-2 pl-2 border focus:border-black focus:outline-none rounded-md"
            placeholder={placeholder}
            {...field}
            value={field.value || ""} // Ensure value is never undefined
            required={required}
          ></textarea>
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormTextarea;
