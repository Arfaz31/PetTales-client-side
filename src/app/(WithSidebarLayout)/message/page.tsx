"use client";

import React, { useEffect, useRef, useState } from "react";
import MessageChatSidebarHeader from "../_component/module/messageComponent/messageSideChatbar";
import ChatCard from "@/components/MessageComponents/ChatCard";
import { useGetUserChats } from "@/hooks/chat.hook";
import { useUser } from "@/context/user.provider";
import ChatMembersSkeleton from "@/components/Skeleton/ChatMembersSkeleton";
import { TChat } from "@/types";
import MessageBox from "../_component/module/messageComponent/messageBox";
import { io, Socket } from "socket.io-client";

const MessagePage = () => {
  const { user } = useUser();
  const [currentChat, setCurrentChat] = useState<TChat | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef<Socket | null>(null);

  const { data: userChats, isLoading } = useGetUserChats(user?._id || "");

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current?.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current?.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat: TChat) => {
    // console.log("Checking online status for:", chat.otherMember._id);
    // console.log("Current online users:", onlineUsers);

    const online = onlineUsers.find(
      (user: { userId: string }) => user.userId === chat.otherMember._id
    );
    // console.log("Online user found:", online);
    return online ? true : false;
  };

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="xl:col-span-3 lg:col-span-4 md:col-span-3 col-span-2 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg border border-gray-400 border-r border-y-0 border-l-0 h-full overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <MessageChatSidebarHeader />

          {/* Scrollable Chat List */}
          <div className="flex flex-col overflow-y-auto md:p-4 p-2">
            {isLoading ? (
              <ChatMembersSkeleton />
            ) : (
              userChats?.data.map((userChat: TChat) => (
                <button
                  key={userChat.chatId}
                  onClick={() => {
                    setCurrentChat(userChat); // Set current chat
                  }}
                  className={`w-full text-left `}
                >
                  <ChatCard
                    chat={userChat}
                    currentChat={currentChat!}
                    userData={userChat.otherMember}
                    online={checkOnlineStatus(userChat)}
                  />
                </button>
              ))
            )}
          </div>

          {/* Hide scrollbar */}
          <style>{`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>

      {/* Main Chat Content */}
      <div className="xl:col-span-9 lg:col-span-8 md:col-span-9 col-span-10 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg overflow-y-hidden">
        {currentChat ? (
          <MessageBox
            chat={currentChat}
            currentUser={user?._id || ""}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        ) : (
          <div className=" h-full ">
            <div className="pt-10">
              <hr className="border-gray-500 " />
              <div className="mt-8 ms-4 ">
                <span className="py-2 px-4 text-white md:text-lg text-sm  max-w-[80%] rounded-2xl bg-blue-600">
                  Tap on a chat to start a conversation...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
