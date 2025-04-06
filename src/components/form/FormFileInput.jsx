"use client";

import { getErrorMessageByPropertyName } from "@/src/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";

const FormFileInput = ({
  name,
  id,
  label,
  required,
  accept,
  multiple = false,
  className,
  handleChange=null
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
        render={({ field: { onChange, value, ...field } }) => (
          <input
            id={id}
            type="file"
            className={`w-full text-sm py-2 pl-2 border focus:border-black focus:outline-none rounded-md ${className}`}
            onChange={(e) => {
              // If multiple files are allowed, pass the FileList
              // If single file, pass the first file
              const files = e.target.files;
              onChange(multiple ? files : files?.[0] || null);
              if (handleChange) {
                handleChange(e);
              }
            }}
            accept={accept}
            multiple={multiple}
            required={required}
            {...field}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormFileInput;
