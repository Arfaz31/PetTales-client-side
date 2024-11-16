"use client";
import PostFilterDropdown from "@/components/Shared/PostsFilter/PostFilterDropdown";
import ALLUsersPostsDataTable from "@/components/Table/AllPostsDataTable";
import { categoryOptions, contentTypeOptions } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ManageAllPost = () => {
  const router = useRouter();
  const [categoryFilterOption, setCategoryFilterOption] =
    useState<string>("All Post");
  const [contentFilterOption, setContentFilterOption] =
    useState<string>("All Content");

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
    router.push(`/dashboard/admin/manage-all-post?${queryParams.toString()}`);
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

    router.push(`/dashboard/admin/manage-all-post?${queryParams.toString()}`);
  };

  return (
    <div className="bg-white shadow-md w-full  overflow-x-scroll  pb-24   relative">
      <div className=" flex md:flex-row flex-col md:gap-0 gap-5 items-center justify-between md:px-6 px-4 py-8 relative">
        <p className="sm:text-2xl text-xl  font-bold">All Users Posts List</p>
        <div className="flex items-center gap-8">
          <div>
            <PostFilterDropdown
              options={contentTypeOptions}
              filterOption={contentFilterOption}
              handleCategoryChange={handleContentTypeChange}
              contentClassName="bg-[#2b2b5e]"
              triggerClassName="bg-[#2b2b5e] text-white min-w-[150px]"
              menuItemClassName="hover:bg-[#414193] "
            />
          </div>
          <div>
            <PostFilterDropdown
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
        <ALLUsersPostsDataTable />
      </div>
    </div>
  );
};

export default ManageAllPost;
