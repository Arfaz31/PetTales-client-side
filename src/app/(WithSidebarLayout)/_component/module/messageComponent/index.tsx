import React from "react";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import { FaPhoneAlt, FaVideo } from "react-icons/fa";

const MessageComponent = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#16181C]">
        <div className="flex items-center justify-between p-4">
          <div className="rounded-full border-2 border-pink-600 cursor-pointer">
            <Image
              src={userimage}
              alt="user profile picture"
              width={35}
              height={35}
              className="rounded-full object-cover object-center w-10 h-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-blue-600 w-6 h-6" />
            <FaVideo className="text-blue-600 w-6 h-6" />
          </div>
        </div>
        <hr className="border-gray-500 w-full" />
      </div>

      {/* Scrollable Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="max-w-[40%] bg-blue-600 text-white rounded-3xl px-4 py-2">
          <p>Here is your message</p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
