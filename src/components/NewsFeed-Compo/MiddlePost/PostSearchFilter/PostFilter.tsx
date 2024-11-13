"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const PostFilter = () => {
  const router = useRouter();
  const [filterOption, setFilterOption] = useState<string>("All Post");

  const handleCategoryChange = (selectedCategory: string) => {
    // console.log("Selected category:", selectedCategory);

    setFilterOption(selectedCategory); // Update the local state for the dropdown display

    // Set query parameters based on category selection
    const queryParams = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "All Post") {
      queryParams.set("category", selectedCategory);
    } else {
      queryParams.delete("category"); // Remove category if "All Post" is selected
    }

    // Update the URL with the selected category
    router.push(`/newsfeed?${queryParams.toString()}`);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="border rounded-lg lg:w-[80%] w-[40%] py-2 px-4 md:text-base text-sm font-semibold cursor-pointer flex items-center justify-between">
            {filterOption === "Tip" ? (
              <>
                <span>Tip</span>
                {filterOption && <FaCheck />}
              </>
            ) : filterOption === "Story" ? (
              <>
                <span>Story</span>
                {filterOption && <FaCheck />}
              </>
            ) : (
              <>
                <span>All Posts</span>
                {filterOption && <FaCheck />}
              </>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-black shadow-lg shadow-gray-600 p-3 space-y-2"
          side="top"
        >
          <DropdownMenuItem
            onClick={() => handleCategoryChange("All Posts")}
            className="w-full hover:bg-[#16181C] cursor-pointer p-2"
          >
            <div className="flex items-center justify-between w-full text-white">
              <span>All Posts</span>
              {filterOption === "All Posts" && <FaCheck />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleCategoryChange("Tip")}
            className="w-full hover:bg-[#16181C] cursor-pointer p-2"
          >
            <div className="flex items-center justify-between w-full text-white">
              <span>Tip</span>
              {filterOption === "Tip" && <FaCheck />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleCategoryChange("Story")}
            className="w-full hover:bg-[#16181C] cursor-pointer p-2"
          >
            <div className="flex items-center justify-between w-full text-white">
              <span>Story</span>
              {filterOption === "Story" && <FaCheck />}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PostFilter;
