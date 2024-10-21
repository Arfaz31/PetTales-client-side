"use client";

import React from "react";
import {
  FaChartPie,
  FaFacebookMessenger,
  FaHome,
  FaRegBell,
  FaUserFriends,
} from "react-icons/fa";

import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/user.provider";

const BottomNav = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const dashboardLink =
    user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  const Links = [
    {
      name: "Newsfeed",
      link: "/newsfeed",
      icon: <FaHome />,
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
      link: "/friends",
      icon: <FaUserFriends />,
    },
  ];

  const isActive = (link: string): boolean => {
    if (link === "/newsfeed") {
      // If the current path is exactly "/newsfeed"
      return pathname === link;
    } else {
      // For subroutes like "/newsfeed/explore", "/newsfeed/notification", etc.
      return pathname === link;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden border-t border-gray-600 bg-black ">
      <div className="flex w-full justify-between py-4 px-2">
        <ul className="flex items-center gap-8">
          {Links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.link}
                className={`flex items-center justify-center hover:bg-[#16181C] text-lg border border-gray-600  text-white rounded-full  ${
                  isActive(link.link) ? "bg-pink-600" : ""
                }`}
              >
                {/* Icon with dynamic class */}
                <span className="text-white w-10 h-10 flex items-center justify-center">
                  {link.icon}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BottomNav;
