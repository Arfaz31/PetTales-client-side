"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import React from "react";
import Drawer from "./Drawer";
import PostSearchModal from "../MiddlePost/PostSearchFilter/PostSearchModal";

const UpperNav = () => {
  return (
    <div className="fixed top-0 left-0  bg-black  border-b border-gray-600 backdrop-blur-lg py-4 w-full">
      <div className="flex items-center   px-2">
        <div>
          <Drawer />
        </div>

        <div className="flex items-center  justify-center w-[90%]">
          {/* Logo */}
          <Link className="flex items-center gap-1 " href="/">
            <Image className="xl:w-[35px] w-[35px]" src={logo} alt="logo" />
            <span className=" text-2xl text-white font-bold">
              PET<span className="text-pink-600">TALES</span>
            </span>
          </Link>
        </div>

        <div>
          <PostSearchModal />
        </div>
      </div>
    </div>
  );
};

export default UpperNav;
