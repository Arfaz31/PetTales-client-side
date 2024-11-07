"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userimage from "@/assets/user-2.png";
import { CircleUser, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constant";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";

const ProfileDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname);
  const { user, setIsLoading: userLoading } = useUser();
  // console.log("user profilepic", user?.profilePhoto);

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/"); //protected route gulo te thaka obosthai logout korle homepage redirect korbe only.
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className=" rounded-3xl w-3/4 hover:bg-[#16181C] cursor-pointer p-2 flex items-center gap-2">
            <div className="rounded-full border-2 border-pink-600 cursor-pointer">
              <Image
                src={user?.profilePhoto || userimage}
                alt="user profile picture"
                width={35}
                height={35}
                className="rounded-full object-cover object-center w-10 h-10"
              />
            </div>
            <p className="flex flex-col ">
              <span className="text-base text-white font-semibold ">
                {user?.name}
              </span>
              <span className="text-sm text-gray-500">
                {user?.username || "@username"}
              </span>
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-black shadow-lg shadow-gray-600 p-3 space-y-2 "
          side="top"
        >
          <DropdownMenuItem
            onClick={() =>
              handleNavigation(`/newsfeed/userprofile/${user?._id}`)
            }
            className="w-full hover:bg-[#16181C] cursor-pointer p-2"
          >
            <p className="flex items-center gap-3 text-white text-lg">
              <CircleUser className="text-white" />
              <p>Profile</p>
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
            onClick={() => handleLogout()}
            className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none"
          >
            <p className="flex items-center gap-3 text-white text-lg">
              <LogOut className="text-white" />
              <p>Logout</p>
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
