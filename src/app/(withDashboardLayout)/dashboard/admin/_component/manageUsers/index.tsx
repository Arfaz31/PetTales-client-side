"use client";

import PostFilterDropdown from "@/components/Shared/PostsFilter/PostFilterDropdown";
import AllUsersDataTable from "@/components/Table/AllUsersDataTable";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

const roleOptions: Option[] = [
  { label: "All users", value: "All users" },
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];
const statusOptions: Option[] = [
  { label: "All users", value: "All users" },
  { label: "Basic", value: "basic" },
  { label: "Premium", value: "premium" },
];

const UsersManagement = () => {
  const router = useRouter();
  const [roleFilterOption, setRoleFilterOption] = useState<string>("All users");
  const [statusFilterOption, setStatusFilterOption] =
    useState<string>("All users");

  const handleRoleChange = (selectedRole: string) => {
    // console.log("Selected category:", selectedCategory);

    setRoleFilterOption(selectedRole); // Update the local state for the dropdown display

    // Set query parameters based on category selection
    const queryParams = new URLSearchParams();
    if (selectedRole && selectedRole !== "All users") {
      queryParams.set("role", selectedRole);
    } else {
      queryParams.delete("role"); // Remove category if "All users" is selected
    }

    router.push(`/dashboard/admin?${queryParams.toString()}`);
  };

  const handleStatusChange = (selectedStatus: string) => {
    setStatusFilterOption(selectedStatus);

    // Set query parameters based on category selection
    const queryParams = new URLSearchParams();
    if (selectedStatus && selectedStatus !== "All users") {
      queryParams.set("status", selectedStatus);
    } else {
      queryParams.delete("status");
    }

    router.push(`/dashboard/admin?${queryParams.toString()}`);
  };

  return (
    <div className="bg-white shadow-md w-full  overflow-x-scroll  pb-24   relative">
      <div className=" flex md:flex-row flex-col md:gap-0 gap-5 items-center justify-between md:px-6 px-4 py-8 relative">
        <p className="sm:text-2xl text-xl  font-bold">My Posts List</p>
        <div className="flex items-center gap-8">
          <div>
            <PostFilterDropdown
              options={roleOptions}
              filterOption={roleFilterOption}
              handleCategoryChange={handleRoleChange}
              contentClassName="bg-[#2b2b5e]"
              triggerClassName="bg-[#2b2b5e] text-white min-w-[150px]"
              menuItemClassName="hover:bg-[#414193] "
            />
          </div>
          <div>
            <PostFilterDropdown
              options={statusOptions}
              filterOption={statusFilterOption}
              handleCategoryChange={handleStatusChange}
              contentClassName="bg-[#2b2b5e]"
              triggerClassName="bg-[#2b2b5e] text-white min-w-[150px]"
              menuItemClassName="hover:bg-[#414193] "
            />
          </div>
        </div>
      </div>
      <div className=" md:px-6 px-4">
        <AllUsersDataTable />
      </div>
    </div>
  );
};

export default UsersManagement;
