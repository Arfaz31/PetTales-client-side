"use client";

import PostFilterDropdown from "@/components/Shared/PostsFilter/PostFilterDropdown";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

const categoryOptions: Option[] = [
  { label: "All Posts", value: "All Post" },
  { label: "Tip", value: "Tip" },
  { label: "Story", value: "Story" },
];

const PostFilter = () => {
  const router = useRouter();
  const [categoryFilterOption, setCategoryFilterOption] =
    useState<string>("All Post");

  const handleCategoryChange = (selectedCategory: string) => {
    setCategoryFilterOption(selectedCategory); // Update the local state for the dropdown display

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
      <PostFilterDropdown
        options={categoryOptions}
        filterOption={categoryFilterOption}
        handleCategoryChange={handleCategoryChange}
        contentClassName="bg-black"
        triggerClassName=" text-white min-w-[130px]"
        menuItemClassName="hover:bg-[#16181C] "
      />
    </div>
  );
};

export default PostFilter;
