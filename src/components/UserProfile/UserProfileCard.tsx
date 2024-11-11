"use client";
import { TPost, TUser } from "@/types";
import React from "react";
import userimage from "@/assets/user-2.png";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useUser } from "@/context/user.provider";
import FollowButton from "../Shared/Follow/FollowButton";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import EditProfileDropdown from "./EditProfileDropdown";
import DataCard from "../Shared/DataCard";

const UserProfileCard = ({
  user,
  myPostData,
}: {
  user: TUser;
  myPostData: TPost[];
}) => {
  const { user: currentUser } = useUser();
  const isFollowing = user.follower?.includes(currentUser?._id || "");
  const isCurrentUser = currentUser?._id === user?._id;
  return (
    <div>
      <div className="relative">
        <div>
          <Image
            src={user?.coverImg || ""}
            alt="user profile picture"
            width={200}
            height={200}
            className={`w-full h-[280px] ${
              user?.coverImg ? " object-cover object-center " : "bg-gray-700"
            }`}
          />
        </div>
        <div className="relative flex justify-between items-center px-3 mt-6">
          <div className="absolute -top-24 left-3 rounded-full border-4 border-white">
            <Image
              src={user?.profilePhoto || userimage}
              alt="user profile picture"
              width={80}
              height={80}
              className="rounded-full object-cover object-center w-32 h-32"
            />
          </div>

          {isCurrentUser ? (
            <div className="ml-auto">
              <EditProfileDropdown user={user} />
            </div>
          ) : (
            <div className="ml-auto">
              <FollowButton
                userId={user._id || " "}
                isFollowing={isFollowing}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-6 px-3">
        <div>
          <p className="text-2xl font-bold text-white">{user?.name}</p>
          <p className="text-base text-gray-500 pt-1">{user?.username}</p>
        </div>
        {user?.status === "premium" ? (
          <p className="pt-1 ">
            <MdVerified className="text-blue-600 w-6 h-6" />
          </p>
        ) : (
          <Link href={"/pricing"}>
            <button className="border rounded-3xl px-4  h-8 ">
              <p className="flex items-center gap-2 text-white text-sm font-bold">
                <MdVerified className="text-blue-600" />
                <span>Get Verified</span>
              </p>
            </button>
          </Link>
        )}
      </div>
      <p className="py-4 text-gray-200 text-base px-3">
        {user?.about || "Not Added"}
      </p>

      <p className="flex items-center gap-2 px-3 pb-2 pt-3">
        <span>
          <IoLocationSharp className="text-gray-500" />
        </span>
        <span className="text-sm text-gray-500">
          {user?.address || "Not Added"}
        </span>
      </p>
      <p className="flex items-center gap-2 px-3 pb-2">
        <span>
          <FaPhoneAlt className="text-gray-500" />
        </span>
        <span className="text-sm text-gray-500">
          {user?.mobileNumber || "Not Added"}
        </span>
      </p>

      <p className="flex items-center gap-2 px-3">
        <span>
          <SlCalender className="text-gray-500" />
        </span>
        <span className="text-sm text-gray-500">
          Joined{" "}
          {user?.createdAt &&
            new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
        </span>
      </p>
      <div className="flex items-center gap-8 text-white px-3 pt-5 pb-6">
        <p>
          {user?.following.length}{" "}
          <span className="text-gray-500">Following</span>
        </p>
        <p>
          {user?.follower.length}{" "}
          <span className="text-gray-500">Followers</span>
        </p>
      </div>

      <hr className="border-gray-600" />

      <div className="pt-5">
        {myPostData.length === 0 ? (
          <p className="text-gray-300 text-lg ps-3 pb-5">No posts available.</p>
        ) : (
          myPostData?.map((post: TPost, index) => (
            <div key={`${post._id}-${index}`}>
              <DataCard
                post={post}
                userId={currentUser?._id || ""}
                isUnlocked={post.isUnlockedBy?.includes(currentUser?._id || "")}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
