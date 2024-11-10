"use client";
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constant";
import { CircleUser, LogOut } from "lucide-react";
import { FaChartPie, FaHome, FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { useGetMe } from "@/hooks/user.hook";

const Drawer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();
  const { data: userdata } = useGetMe();

  const handleLogout = () => {
    logout();
    userLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const dashboardLink =
    user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  const Links = [
    {
      name: "Profile",
      link: `/newsfeed/userprofile/${user?._id}`,
      icon: <CircleUser />,
    },
    ...(user
      ? [
          {
            name: "Dashboard",
            link: dashboardLink,
            icon: <FaChartPie />,
          },
        ]
      : []),

    {
      name: "Bookmark",
      link: "/newsfeed/bookmark",
      icon: <FaRegBookmark />,
    },
    {
      name: "Settings & Privacy",
      link: "/settings",
      icon: <IoSettingsOutline />,
    },
    { name: "Home", link: "/", icon: <FaHome /> },
  ];
  return (
    <div>
      <div className="z-50">
        <Sheet>
          <SheetTrigger asChild>
            <div className=" rounded-full border-2 border-pink-600 cursor-pointer">
              <Image
                src={user?.profilePhoto || userimage}
                alt="user profile picture"
                width={35}
                height={35}
                className="rounded-full object-cover object-center w-10 h-10 "
              />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="bg-black overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <div>
                  <div className=" rounded-full ">
                    <Image
                      src={user?.profilePhoto || userimage}
                      alt="user profile picture"
                      width={35}
                      height={35}
                      className="rounded-full object-cover border-2 border-pink-600 cursor-pointer object-center w-10 h-10 "
                    />
                  </div>
                  <p className="text-base text-start font-bold text-white pt-2">
                    {user?.name}
                  </p>
                  <p className="text-sm text-start text-gray-500 pb-5">
                    {user?.username}
                  </p>
                  <p className="flex items-center gap-20 pb-6">
                    <span className="text-gray-500 text-sm">
                      <span className="text-white text-base font-semibold">
                        {userdata?.data?.following.length}
                      </span>{" "}
                      Following
                    </span>
                    <span className="text-gray-500 text-sm">
                      <span className="text-white text-base font-semibold">
                        {userdata?.data?.follower.length}
                      </span>{" "}
                      Followers
                    </span>
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="pt-3">
              <ul className="space-y-5">
                {Links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.link}
                      className={`flex items-center gap-3  w-full hover:bg-[#16181C] text-lg  text-white font-bold rounded-3xl`}
                    >
                      <SheetClose asChild>
                        <div className="flex items-center gap-3">
                          <span className="text-white w-8 h-8 flex items-center justify-center">
                            {link.icon}
                          </span>
                          <p>{link.name}</p>
                        </div>
                      </SheetClose>
                    </Link>
                  </li>
                ))}
                <li
                  onClick={() => handleLogout()}
                  className="w-full hover:bg-[#16181C] cursor-pointer  border-none"
                >
                  <p className="flex items-center gap-3 text-white text-lg ps-2">
                    <LogOut className="text-white " />
                    <p className="text-lg font-bold">Logout</p>
                  </p>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Drawer;
