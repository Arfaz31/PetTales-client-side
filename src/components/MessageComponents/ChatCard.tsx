import React from "react";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import { TChat, TMember } from "@/types";

const ChatCard = ({
  chat,
  currentChat,
  userData,
  online,
}: {
  chat: TChat;
  currentChat: TChat;
  userData: TMember;
  online: boolean;
}) => {
  // console.log(online);
  return (
    <div className="mt-4">
      <div
        className={`flex items-center ${
          currentChat?.chatId === chat.chatId ? "bg-blue-950" : "bg-[#2c2c2c]"
        }  rounded-lg lg:gap-5 gap-3 md:px-4 px-1 py-2 mb-2 `}
      >
        <div className="relative md:mx-0 mx-auto">
          <div className="rounded-full border-2 border-pink-600 cursor-pointer ">
            <Image
              src={userData?.profilePhoto || userimage} // Use user profile photo or fallback
              alt="user profile picture"
              width={35}
              height={35}
              className="rounded-full object-cover object-center md:w-10 md:h-10 w-9 h-9"
            />
          </div>
          {/* Online Status Indicator */}
          {online && (
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2c2c2c]"></div>
          )}
        </div>

        <div className="md:block hidden">
          <p className="text-lg font-semibold text-white lg:block md:hidden block">
            {userData.name || "Unknown User"}
          </p>
          <p className="text-base text-gray-400 text-start pt-1">
            {online ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
