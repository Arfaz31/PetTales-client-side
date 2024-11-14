import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { FaCheck } from "react-icons/fa";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  filterOption: string;
  handleCategoryChange: (value: string) => void;
  contentClassName?: string;
  triggerClassName?: string;
  menuItemClassName?: string;
}

const PostFilterDropdown = ({
  options,
  filterOption,
  handleCategoryChange,
  contentClassName,
  triggerClassName,
  menuItemClassName,
}: Props) => {
  const selectedLabel =
    options.find((option) => option.value === filterOption)?.label ||
    options[0].label;
  // This find method checks if there is an option that matches the value of filterOption in the options array. If a match is found, it returns the label of that option. If no match is found, it uses the label of the first option in the array as a fallback.
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={`border rounded-lg lg:w-[80%] w-[40%] py-2 px-4 md:text-base text-sm font-semibold cursor-pointer flex items-center justify-between ${triggerClassName}`}
          >
            <span>{selectedLabel}</span>
            {filterOption && <FaCheck />}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={`w-56  shadow-lg shadow-gray-600 p-3 space-y-2 ${contentClassName}`}
          side="top"
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleCategoryChange(option.value)}
              className={`w-full  cursor-pointer p-2 border-none  ${menuItemClassName}`}
            >
              <div className="flex items-center justify-between w-full text-white">
                <span>{option.label}</span>
                {filterOption === option.value && <FaCheck />}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PostFilterDropdown;
