"use client";

import { useFormContext } from "react-hook-form";

interface IOption {
  key: string;
  label: string;
  disabled?: boolean;
}

interface IProps {
  name: string;
  label?: string;
  options: IOption[];
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Add onChange prop
}

const FXSelect: React.FC<IProps> = ({
  options,
  name,
  label,
  className = "",
  onChange, // Accept onChange prop
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label htmlFor={name} className="text-sm text-gray-500">
          {label}
        </label>
      )}
      <select
        {...register(name)}
        id={name}
        onChange={onChange} // Attach onChange handler
        className={`bg-transparent border ${
          errors[name] ? "border-red-500" : "border-gray-400"
        }
          focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-gray-400 h-12 px-3 ${className}`}
      >
        <option value="" disabled className="bg-black text-gray-600">
          Select an option
        </option>
        {options.map((option) => (
          <option
            key={option.key}
            value={option.key}
            disabled={option.disabled}
            className="bg-black text-gray-600 hover:bg-[#16181c]"
          >
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FXSelect;
