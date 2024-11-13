"use client";
import PostFilter from "@/components/Shared/PostsFilter/PostFilter";
import MyPostsDataTable from "@/components/Table/MyPostsDataTable";
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
const contentTypeOptions: Option[] = [
  { label: "All Content", value: "All Content" },
  { label: "Basic", value: "basic" },
  { label: "Premium", value: "premium" },
];

const MyPostsManagement = () => {
  const router = useRouter();
  const [categoryFilterOption, setCategoryFilterOption] =
    useState<string>("All Post");
  const [contentFilterOption, setContentFilterOption] =
    useState<string>("All Content");

  const handleCategoryChange = (selectedCategory: string) => {
    // console.log("Selected category:", selectedCategory);

    setCategoryFilterOption(selectedCategory); // Update the local state for the dropdown display

    // Set query parameters based on category selection
    const queryParams = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "All Post") {
      queryParams.set("category", selectedCategory);
    } else {
      queryParams.delete("category"); // Remove category if "All Post" is selected
    }

    // Update the URL with the selected category
    router.push(`/dashboard/user?${queryParams.toString()}`);
  };

  const handleContentTypeChange = (selectedContent: string) => {
    setContentFilterOption(selectedContent);

    // Set query parameters based on category selection
    const queryParams = new URLSearchParams();
    if (selectedContent && selectedContent !== "All Content") {
      queryParams.set("contentType", selectedContent);
    } else {
      queryParams.delete("contentType");
    }

    router.push(`/dashboard/user?${queryParams.toString()}`);
  };

  return (
    <div className="bg-white shadow-md w-full  overflow-x-scroll  pb-24   relative">
      <div className=" flex md:flex-row flex-col md:gap-0 gap-5 items-center justify-between md:px-6 px-4 py-8 relative">
        <p className="sm:text-2xl text-xl  font-bold">My Posts List</p>
        <div className="flex items-center gap-8">
          <div>
            <PostFilter
              options={contentTypeOptions}
              filterOption={contentFilterOption}
              handleCategoryChange={handleContentTypeChange}
              contentClassName="bg-[#2b2b5e]"
              triggerClassName="bg-[#2b2b5e] text-white min-w-[150px]"
              menuItemClassName="hover:bg-[#414193] "
            />
          </div>
          <div>
            <PostFilter
              options={categoryOptions}
              filterOption={categoryFilterOption}
              handleCategoryChange={handleCategoryChange}
              contentClassName="bg-[#2b2b5e]"
              triggerClassName="bg-[#2b2b5e] text-white min-w-[150px]"
              menuItemClassName="hover:bg-[#414193] "
            />
          </div>
        </div>
      </div>
      <div className=" md:px-6 px-4">
        <MyPostsDataTable />
      </div>
    </div>
  );
};

export default MyPostsManagement;
