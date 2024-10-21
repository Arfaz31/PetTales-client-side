"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaKey, FaUserAlt } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { PiHeartBreakFill } from "react-icons/pi";
const AccountPage = () => {
  const pathname = usePathname();
  const Links = [
    {
      name: "Account information",
      link: "/settings/account/account-info",
      subtitle:
        "See your account information like your phone number and email address",
      icon: <FaUserAlt />,
    },

    {
      name: "Change your password",
      link: "/settings/account/change-password",
      subtitle: "Change your password anytime",
      icon: <FaKey />,
    },
    {
      name: "Deactivate your account",
      link: "/settings/account/deactivate",
      subtitle: "Find out how you can deactivate your account",
      icon: <PiHeartBreakFill />,
    },
  ];

  // Explicitly type 'link' as a string in isActive function
  const isActive = (link: string): boolean => pathname === link;
  return (
    <div className=" border border-gray-600 min-h-screen border-y-0 border-l-0 bg-black py-2">
      <h1 className="text-2xl font-bold text-white pb-6 px-4 pt-2 ">
        Your Account
      </h1>
      <p className="text-gray-500 px-4 pb-8">
        See information about your account, download an archive of your data, or
        learn about your account deactivation options
      </p>
      <div>
        <ul className="space-y-1">
          {Links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.link}
                className={`flex items-center justify-between  p-2 w-full hover:bg-[#16181C] text-lg  text-white   ${
                  isActive(link.link) ? "bg-[#5a6d93] w-full" : ""
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className="text-gray-400 w-8 h-8 flex items-center justify-center">
                    {link.icon}
                  </span>
                  <div className="flex flex-col ">
                    <p className="text-base  text-white ">{link.name}</p>
                    <p className="text-gray-500 text-sm">{link.subtitle}</p>
                  </div>
                </div>
                <span className=" w-8 h-8 text-white flex items-center justify-center">
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

export default AccountPage;
