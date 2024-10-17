"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userimage from "@/assets/user-2.png";
import { ChartNoAxesCombined, CircleUser, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constant";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
const NavbarDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true); //the re-fetch triggered by userLoading(true) will get the latest user data (i.e., the logged-in user's data). Without this mechanism, the app might not fetch the latest user data after a login, leaving the context unaware of the login state change.

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
          <div className=" rounded-full border-2 border-pink-600 cursor-pointer">
            <Image
              src={user?.profilePhoto || userimage}
              alt="user profile picture"
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-black/90 p-4 space-y-3">
          {/* <Link href={`/newsfeed/userprofile/${user?._id}`}>
            <p className="flex items-center gap-3 text-white">
              <CircleUser className="text-white" />
              <p>Profile</p>
            </p>
          </Link> */}
          {/* <Link href={`/dashboard/${user?.role}`}>
            <p className="flex items-center gap-3 text-white">
              <ChartNoAxesCombined className="text-white" />
              <p>Profile</p>
            </p>
          </Link> */}
          <DropdownMenuItem
            onClick={() =>
              handleNavigation(`/newsfeed/userprofile/${user?._id}`)
            }
          >
            <p className="flex items-center gap-3 text-white cursor-pointer p-2">
              <CircleUser className="text-white" />
              <p>Profile</p>
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleNavigation(`/dashboard/${user?.role}`)}
          >
            <p className="flex items-center gap-3 text-white cursor-pointer p-2">
              <ChartNoAxesCombined className="text-white" />
              <p>Profile</p>
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleLogout()}>
            <p className="flex items-center gap-3 text-white cursor-pointer p-2">
              <LogOut className="text-white" />
              <p>Logout</p>
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarDropdown;
