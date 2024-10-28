"use client";

import { TPost } from "@/types";
import Image from "next/image";
import React from "react";
import userimage from "@/assets/user-2.png";
import PostDropDown from "../PostDropdown/PostDropDown";
import ImageGallery from "./PostImage";
import { FaLock } from "react-icons/fa";
import PostAction from "./PostAction";
import CommentCard from "../Comment/CommentCard";

const PostCard = ({
  post,
  isUnlocked,
}: {
  post: TPost;
  isUnlocked: boolean;
}) => {
  return (
    <div className="min-h-[400px] border-b border-gray-600 py-5">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-3 xl:col-span-3 md:col-span-4 col-span-5">
          <div className="rounded-full border-2 border-pink-600 cursor-pointer">
            <Image
              src={post?.user?.profilePhoto || userimage}
              alt="user profile picture"
              width={35}
              height={35}
              className="rounded-full object-cover object-center w-10 h-10"
            />
          </div>
          <p className="flex flex-col">
            <span className="text-sm text-white font-normal ">
              {post?.user?.name}
            </span>
            <span className="text-sm text-gray-500">
              {post?.createdAt && new Date(post?.createdAt).toLocaleString()}
            </span>
          </p>
        </div>
        <div>
          <PostDropDown post={post} />
        </div>
      </div>

      <div className="px-3">
        <h1 className="text-white text-xl font-bold pt-4">{post?.title}</h1>

        {post.contentType === "premium" && !isUnlocked ? (
          // Premium post is locked and not unlocked by the current user
          <>
            <p className="text-gray-300 text-base pt-3 pb-6">
              {post?.content?.slice(0, 100)}........
            </p>

            <div className="relative my-5">
              {/* Blurred image with lock icon */}
              <div className="blur-xl">
                <ImageGallery images={post?.images ?? []} />
              </div>
              <div className="absolute inset-0 flex justify-center items-center cursor-pointer">
                <span className="text-gray-400 bg-white rounded-full p-4 border border-pink-500 text-lg font-bold ">
                  <FaLock className="w-12 h-12" />
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-pink-600 text-white text-base font-medium w-[70%]  py-2 px-4 rounded-3xl flex items-center justify-between">
                <span>Unlock Post</span>
                <span>
                  {" "}
                  <FaLock />
                </span>
              </button>
            </div>
          </>
        ) : (
          // Post is unlocked or it's a basic post
          <>
            <p className="text-gray-300 text-base pt-3 pb-6">{post?.content}</p>
            <ImageGallery images={post?.images ?? []} />
            <hr className="border-gray-600 mt-10" />
            <div className="py-1">
              <PostAction post={post} />
            </div>
            <div>
              <CommentCard postId={post._id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
