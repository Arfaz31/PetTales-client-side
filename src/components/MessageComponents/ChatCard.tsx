import React from "react";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
const ChatCard = () => {
  return (
    <div className="  mt-4">
      <div className="flex items-center bg-[#2c2c2c] rounded-lg lg:gap-5 gap-3 px-4 py-2 mb-2">
        <div className=" rounded-full border-2 border-pink-600 cursor-pointer">
          <Image
            src={userimage}
            alt="user profile picture"
            width={35}
            height={35}
            className="rounded-full object-cover object-center w-10 h-10 "
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-white lg:block md:hidden block">
            Arfaz Ahamed
          </p>
          <p className="text-base text-gray-400 pt-1">Online</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
