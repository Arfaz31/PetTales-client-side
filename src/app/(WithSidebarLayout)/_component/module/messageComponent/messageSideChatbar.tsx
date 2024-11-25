"use client";

import MessageTopNavForSmDevice from "@/components/MessageComponents/TopNavForSmDevice";

import React from "react";
import { FaSearch } from "react-icons/fa";

const MessageChatSidebarHeader = () => {
  return (
    <div>
      {/* Sticky Header */}
      <div className="bg-[#16181C] sticky top-0 z-10">
        <div className="md:ps-6 ps-2 pe-3 py-4">
          <div className="flex md:flex-row flex-col-reverse items-center md:justify-between justify-center">
            <h1 className="text-white md:text-2xl text-lg md:ps-0 ps-1 font-bold">
              Chats
            </h1>

            <div>
              <MessageTopNavForSmDevice />
            </div>
          </div>
          <div className="pt-4 pb-4">
            <form className="relative">
              <button type="submit" className="absolute ml-4 mt-3">
                <FaSearch className="text-white" />
              </button>
              <input
                type="search"
                name="search"
                placeholder="Search Chat"
                className="bg-[#202327] flex flex-grow h-10 pl-10 pr-5 w-full rounded-full md:text-sm text-xs shadow border-0"
              />
            </form>
          </div>
        </div>
        <hr className="border-gray-500 w-full" />
      </div>
    </div>
  );
};

export default MessageChatSidebarHeader;
