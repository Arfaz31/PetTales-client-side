/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import { IMessage, TChat } from "@/types";
import { FaPhone, FaVideo } from "react-icons/fa";
import { format } from "timeago.js";
import EmojiPicker from "emoji-picker-react"; // Import EmojiPicker
import { useGetUserMessage, useUserAddMessage } from "@/hooks/chat.hook";
import { BsEmojiSmile } from "react-icons/bs";
import { Dispatch, SetStateAction } from "react";
const MessageBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
}: {
  chat: TChat;
  currentUser: string;
  setSendMessage: Dispatch<SetStateAction<any>>;
  receivedMessage: IMessage | null;
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false); // State for showing emoji picker
  const [loadingNewChat, setLoadingNewChat] = useState<boolean>(false); // Loading state for chat transition

  const {
    data: messageData,
    isLoading,
    refetch,
  } = useGetUserMessage(chat?.chatId || "");

  // Trigger refetch when chat changes
  useEffect(() => {
    if (chat?.chatId) {
      setLoadingNewChat(true); // Set loading state to true
      refetch().finally(() => setLoadingNewChat(false)); // Reset loading state after fetching
    }
  }, [chat?.chatId, refetch]);

  // Initialize messages with fetched data
  useEffect(() => {
    if (messageData?.data) {
      setMessages(messageData.data);
      // console.log("Messages state updated:", messageData.data);
    }
  }, [messageData]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { mutate: addMessage } = useUserAddMessage();

  const handleEmojiClick = (emojiObject: any) => {
    setNewMessage((prev) => prev + emojiObject.emoji); // Append emoji to message
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        senderId: currentUser,
        text: newMessage,
        chatId: chat?.chatId || "",
      };
      // send message to socket server
      setSendMessage({ ...message, receiverId: chat?.otherMember._id });
      // send message to database
      addMessage(message);
      setNewMessage(""); // Clear input after sending
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat?.chatId) {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    }
  }, [receivedMessage, chat?.chatId]);

  const scroll = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div className="flex flex-col h-screen">
        {/* Chat Header */}
        <div className="sticky top-0 z-40 bg-gray-900 pt-4 pb-2">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Image
                src={chat?.otherMember.profilePhoto || userimage}
                alt="User profile picture"
                width={40}
                height={40}
                className="rounded-full object-cover w-10 h-10 border-2 border-pink-600 cursor-pointer"
              />
              <div>
                <p className="text-lg font-semibold text-gray-300">
                  {chat?.otherMember.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <FaVideo className="text-blue-600 w-6 h-6 cursor-pointer" />
              <FaPhone className="text-blue-600 w-6 h-6 cursor-pointer" />
            </div>
          </div>
          <hr className="border-gray-500 mt-4" />
        </div>

        {/* Messages body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading || loadingNewChat ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
            </div>
          ) : (
            messages.map((message: IMessage) => (
              <div
                ref={scroll}
                key={message._id}
                className={`flex ${
                  message.senderId._id === currentUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.senderId._id !== currentUser && (
                    <Image
                      src={chat?.otherMember.profilePhoto || userimage}
                      alt="User profile picture"
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-10 h-10 border-2 border-pink-600 cursor-pointer"
                    />
                  )}
                  <div
                    className={`py-2 px-4 text-sm text-white min-w-[65%] rounded-2xl ${
                      message.senderId._id === currentUser
                        ? "bg-blue-600"
                        : "bg-pink-600"
                    }`}
                  >
                    <p className="text-sm">{message?.text}</p>
                    <p className="text-[10px] mt-[2px] text-gray-300">
                      {format(message?.createdAt || new Date())}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message bottom */}
        <div className="sticky bottom-0 bg-gray-900 p-4 z-[999]">
          <div className="flex items-center rounded-full px-4 py-2 bg-gray-800">
            {/* Emoji Picker Toggle */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-blue-600 font-bold mr-2"
            >
              <BsEmojiSmile className="md:w-7 md:h-7 w-6 h-6" />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-16 left-4 z-50">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={310}
                  height={370}
                />
              </div>
            )}
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 w-[80px] bg-gray-800 text-gray-300 border-none rounded-full px-4  outline-none"
            />
            <button
              className=" text-blue-600   py-1 text-base hover:text-white hover:scale-x-105 transition-transform duration-500 font-semibold"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
