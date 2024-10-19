import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { FaEllipsisVertical } from "react-icons/fa6";
const MiddlePost = () => {
  return (
    <div className=" border border-gray-600 min-h-screen border-y-0 bg-black py-2">
      <div className=" sticky top-0 z-50 bg-black w-full">
        <div className="flex items-center w-full justify-between px-2 pb-2">
          <div>
            <div className="lg:block hidden">
              <h2 className="px-4 py-2 text-2xl font-bold text-white ">
                <Link href="/">Home</Link>
              </h2>
            </div>
            <div className="ps-2 py-2 lg:hidden block">
              <Link className="flex items-center gap-1 p-4" href="/">
                <Image className="xl:w-[40px] w-[40px]" src={logo} alt="logo" />
                <span className=" text-2xl text-white font-bold">
                  PET<span className="text-pink-600">TALES</span>
                </span>
              </Link>
            </div>
          </div>
          <div>
            <span className="text-white">
              <FaEllipsisVertical />
            </span>
          </div>
        </div>
        <hr className="border-gray-600" />
      </div>
    </div>
  );
};

export default MiddlePost;
