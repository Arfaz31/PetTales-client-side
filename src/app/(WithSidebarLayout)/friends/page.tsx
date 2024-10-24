"use client";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import { TUser } from "@/types";
import { useGetAllUser } from "@/hooks/user.hook";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/user.provider";

const Friends = () => {
  const { data, isLoading } = useGetAllUser();

  const { user: loggedInUser } = useUser(); // Get the logged-in user
  // Filter out the logged-in user from the list of users
  const filteredUsers =
    data?.data?.filter((user: TUser) => user._id !== loggedInUser?._id) || []; // Get all users from the data array or use an empty array if no data exists
  return (
    <div className=" border border-gray-600 min-h-screen border-y-0 bg-black py-2">
      <div className=" md:sticky static top-0 z-50 bg-black w-full">
        <div className="flex items-center w-full justify-between px-4  pb-4">
          <div>
            <div>
              <h2 className="  text-2xl font-bold text-white ">Connect</h2>
            </div>
          </div>
          <div>
            <span className="text-white">
              <IoSettingsOutline />
            </span>
          </div>
        </div>
        <hr className="border-gray-600" />
      </div>
      <div className="p-4">
        <>
          {isLoading ? (
            [...Array(9)].map((_, index) => (
              <div key={index} className="mb-5">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full bg-gray-600" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-gray-600" />
                      <Skeleton className="h-4 w-[200px] bg-gray-600" />
                    </div>
                  </div>
                  <Skeleton className="h-12 w-28 rounded-3xl bg-gray-600" />
                </div>
              </div>
            ))
          ) : filteredUsers.length > 0 ? (
            <div className="space-y-7">
              {filteredUsers?.map((user: TUser) => (
                <div key={user._id}>
                  <div className=" flex items-center justify-between ">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full border-2 w-10 h-10 border-pink-600 cursor-pointer">
                        <Image
                          src={user?.profilePhoto || userimage}
                          alt="user profile picture"
                          width={35}
                          height={35}
                          className="rounded-full object-cover object-center w-10 h-10"
                        />
                      </div>
                      <p className="flex flex-col ">
                        <span className="text-base text-white font-semibold ">
                          {user?.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {user?.username || "@username"}
                        </span>
                      </p>
                    </div>

                    <button className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 text-base font-bold text-white text-center px-4 py-2">
                      Follow
                    </button>
                  </div>
                  <p className="text-white pt-2">
                    {user?.about ? user.about : "About blank"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-lg font-semibold ">
              No users found
            </p>
          )}
        </>
      </div>
    </div>
  );
};

export default Friends;
