"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { FaChartPie, FaUserFriends } from "react-icons/fa";

import { useUser } from "@/context/user.provider";
import { MdDynamicFeed } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import NavbarDropdown from "@/components/ResponsiveComponent/ResponsiveNav/NavbarDropdown";
import MessageTopNavForSmDevice from "@/components/MessageComponents/TopNavForSmDevice";

const MessageLayoutTopNav = () => {
  const { user } = useUser();
  const dashboardLink =
    user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  const Links = [
    {
      name: "Home",
      link: "/",
      icon: <FiHome />,
    },
    {
      name: "Newsfeed",
      link: "/newsfeed",
      icon: <MdDynamicFeed />,
    },
    {
      name: "Follow",
      link: "/friends",
      icon: <FaUserFriends />,
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
  ];
  return (
    <div className="sticky top-0 left-0 z-50 px-6 py-2  bg-black/15  border-b border-gray-600 backdrop-blur-lg w-full">
      <div className="flex items-center justify-between  ">
        <div className="md:hidden block">
          <MessageTopNavForSmDevice />
        </div>
        <div className="flex items-center  justify-center ">
          {/* Logo */}
          <Link className="flex items-center gap-1 " href="/">
            <Image className="xl:w-[35px] w-[35px]" src={logo} alt="logo" />
            <span className=" text-2xl text-white font-bold">
              PET<span className="text-pink-600">TALES</span>
            </span>
          </Link>
        </div>

        <div className="md:block hidden">
          <ul className="flex items-center  space-x-20 ">
            {Links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.link}
                  className={`flex items-center justify-center hover:bg-[#16181C] text-lg border border-gray-600  text-white rounded-full`}
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

        <div>
          <NavbarDropdown />
        </div>
      </div>
    </div>
  );
};

export default MessageLayoutTopNav;
