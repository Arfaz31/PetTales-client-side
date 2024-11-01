"use client";

import { useFormContext } from "react-hook-form";
import React from "react";

interface FormTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  rows?: number; // Number of rows for textarea
}

const FXTextArea: React.FC<FormTextAreaProps> = ({
  name,
  label,
  placeholder,
  className = "",
  rows = 4, // Default rows if not specified
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // Access form methods and state

  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label htmlFor={name} className="text-sm text-gray-500">
          {label}
        </label>
      )}
      <textarea
        {...register(name)}
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={`bg-transparent text-gray-400 p-3 border ${
          errors[name] ? "border-red-500" : "border-gray-400"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ${className}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FXTextArea;
