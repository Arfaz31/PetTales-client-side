"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { CgMoreO } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
const MenuDropdown = () => {
  const router = useRouter();
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className=" rounded-3xl w-3/4 cursor-pointer hover:bg-[#16181C] p-2 flex items-center gap-6">
            <span className="text-white ">
              <CgMoreO />
            </span>
            <p className="text-white text-lg">More</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-black shadow-lg shadow-gray-600 p-3 space-y-2"
          side="top"
        >
          <DropdownMenuItem
            onClick={() => handleNavigation(`/newsfeed/bookmark`)}
            className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none"
          >
            <p className="flex items-center gap-3 text-white text-lg">
              <FaRegBookmark className="text-white" />
              <p>Bookmark</p>
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleNavigation(`/settings`)}
            className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none"
          >
            <p className="flex items-center gap-3 text-white text-lg">
              <IoSettingsOutline className="text-white" />
              <p>Settings & Privacy</p>
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleNavigation(`/pricing`)}
            className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none"
          >
            <p className="flex items-center gap-3 text-white text-lg">
              <MdVerified className="text-blue-600" />
              <p>Get Verified</p>
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MenuDropdown;
