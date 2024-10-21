"use client";

import { useFormContext } from "react-hook-form";
import React from "react";

interface FormInputProps {
  name: string;
  label?: string;
  type?: string; // Input type (text, password, etc.)
  placeholder?: string;
  className?: string;
}

const FXInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  className = "",
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
      <input
        {...register(name)}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`bg-transparent h-12 px-3 border ${
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

export default FXInput;
