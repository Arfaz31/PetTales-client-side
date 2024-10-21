import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const HelpCenter = () => {
  return (
    <div className="border border-gray-600 min-h-screen border-y-0 lg:border-l-0 border-l bg-black py-4">
      <div className="flex items-center gap-6 px-3 pb-4">
        <Link href="/settings/account">
          <span>
            <FaArrowLeft />
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-white">Help Center</h1>
      </div>

      <div>
        <div className="flex justify-center text-slate-300 items-center mt-10">
          <p className="text-3xl font-thin">W</p>
          <div className="w-7 h-7 border-8 border-dashed rounded-full animate-spin mt-2 border-pink-600"></div>
          <p className="text-3xl font-thin ">rking on this page...</p>
        </div>
        <div>
          <p className="text-center text-slate-300 mt-2">
            Wait for next update...
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
