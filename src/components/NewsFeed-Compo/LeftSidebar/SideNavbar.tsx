"use client";
import { useUser } from "@/context/user.provider";
import React from "react";
import {
  FaChartPie,
  FaFacebookMessenger,
  // FaHome,
  FaRegBell,
  FaUserCheck,
  FaUserFriends,
} from "react-icons/fa";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdDynamicFeed } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { usePathname } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";
import MenuDropdown from "./MenuDropdown";

const SideNavbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const dashboardLink =
    user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  const Links = [
    // { name: "Home", link: "/", icon: <FaHome /> },
    {
      name: "Newsfeed",
      link: "/newsfeed",
      icon: <MdDynamicFeed />,
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
      name: "Explore",
      link: "/newsfeed/explore",
      icon: <FaMagnifyingGlass />,
    },
    {
      name: "Notification",
      link: "/newsfeed/notification",
      icon: <FaRegBell />,
    },
    {
      name: "Message",
      link: "/newsfeed/message",
      icon: <FaFacebookMessenger />,
    },
    {
      name: "Follow",
      link: "/newsfeed/friends",
      icon: <FaUserFriends />,
    },
    {
      name: "Profile",
      link: `/newsfeed/userprofile/${user?._id}`,
      icon: <FaUserCheck />,
    },
  ];

  // Explicitly type 'link' as a string in isActive function
  const isActive = (link: string): boolean => pathname === link;

  return (
    <div className="min-h-screen flex flex-col  bg-black text-white sticky top-0 py-2">
      <div className="pb-2">
        {/* Logo */}
        <Link className="flex items-center gap-1 p-4" href="/">
          <Image className="xl:w-[35px] w-[35px]" src={logo} alt="logo" />
          <span className="xl:text-3xl text-2xl text-white font-bold">
            PET<span className="text-pink-600">TALES</span>
          </span>
        </Link>
      </div>
      <div className="pb-6">
        {/* Links */}
        <ul className="space-y-1">
          {Links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.link}
                className={`flex items-center gap-3 p-2 w-3/4 hover:bg-[#16181C] text-lg  text-white rounded-3xl  ${
                  isActive(link.link) ? "bg-[#16181C] " : ""
                }`}
              >
                {/* Icon with dynamic class */}
                <span className="text-white w-8 h-8 flex items-center justify-center">
                  {link.icon}
                </span>
                <p>{link.name}</p>
              </Link>
            </li>
          ))}
          <li className="ps-1">
            <MenuDropdown />
          </li>
        </ul>
      </div>

      <button className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 text-lg font-bold text-white text-center px-4 py-2 w-3/4">
        Post
      </button>
      <div className="pt-16">
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default SideNavbar;
