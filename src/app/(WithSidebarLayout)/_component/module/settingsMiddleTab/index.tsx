"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const SettingsMiddleTab = () => {
  const pathname = usePathname();
  const Links = [
    {
      name: "Your Account",
      link: "/settings/account",
    },

    {
      name: "Privacy and Safety",
      link: "/settings/privacy",
    },
    {
      name: "Notifications",
      link: "/settings/notifications",
    },
    {
      name: "Help Center",
      link: "/settings/help-center",
    },
  ];

  // Modify isActive to default to "/settings/account" if no other link matches
  const isActive = (link: string): boolean => {
    if (pathname === "/settings" || pathname === "/settings/account") {
      return link === "/settings/account";
    }
    return pathname === link;
  };

  return (
    <div className=" border border-gray-600 min-h-screen border-y-0 bg-black py-2">
      <div className=" sticky top-0 z-50 bg-black w-full">
        <div className=" w-full px-2 pb-2">
          <div>
            <h2 className="px-3 py-2 text-2xl font-bold text-white ">
              Settings
            </h2>
            <div className="w-full pt-3 px-3">
              <button type="submit" className="absolute ml-4 mt-3 mr-4">
                <FaSearch />
              </button>
              <input
                type="search"
                name="search"
                placeholder="Search settings"
                className="bg-[#202327] h-10 px-10 pr-5 w-full rounded-full text-sm focus:bg-pink-600  shadow border-0"
              />
            </div>
          </div>
        </div>
        <hr className="border-gray-600" />
      </div>

      <div className="py-6 ">
        <ul className="space-y-2">
          {Links.map((link) => (
            <li key={link.name} className="flex items-center justify-between">
              <Link
                href={link.link}
                className={`flex items-center justify-between p-3 w-full hover:bg-[#16181C] text-lg  text-white   ${
                  isActive(link.link) ? "bg-[#16181C] w-full" : ""
                }`}
              >
                <p>{link.name}</p>
                <span className="text-white w-8 h-8 flex items-center justify-center">
                  <MdOutlineArrowForwardIos />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingsMiddleTab;
