import ChatCard from "@/components/MessageComponents/ChatCard";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";

const MessageLayoutChatbar = () => {
  return (
    <div className="h-full flex flex-col ">
      {/* Sticky Header */}
      <div className="bg-[#16181C] sticky top-0 z-10">
        <div className="ps-6 pe-3 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-bold">Chats</h1>
            <p className="bg-[#16181C] text-lg border border-gray-600 rounded-full p-1">
              <FaEllipsis className="text-white w-6 h-6" />
            </p>
          </div>
          <div className="pt-4 pb-4">
            <form className="relative ">
              <button type="submit" className="absolute ml-4 mt-3">
                <FaSearch className="text-white" />
              </button>
              <input
                type="search"
                name="search"
                placeholder="Search Chat"
                className="bg-[#202327] h-10 pl-10 pr-5 w-full rounded-full text-sm shadow border-0"
              />
            </form>
          </div>
        </div>
        <hr className="border-gray-500 w-full" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto p-4">
        <ChatCard />
      </div>
      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MessageLayoutChatbar;
