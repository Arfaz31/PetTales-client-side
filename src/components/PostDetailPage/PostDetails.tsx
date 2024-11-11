"use client";

import { TPost } from "@/types";
import React from "react";
import userimage from "@/assets/user-2.png";
import Image from "next/image";
import PostDetailDropDown from "./PostDetailDropDown";
import PostAction from "../NewsFeed-Compo/MiddlePost/Posts/PostAction";
import PostDetailCommentCard from "./postDetailCommentCard";
import PostDetailImageGallery from "./PostDetailImge";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

const PostDetails = ({ post }: { post: TPost }) => {
  return (
    <div className="min-h-[400px]  border-gray-600 py-5">
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
          <div className="flex flex-col">
            <p className="flex items-center gap-2 ">
              <Link href={`/newsfeed/userprofile/${post?.user?._id}`}>
                <span className="text-sm text-white font-normal ">
                  {post?.user?.name}
                </span>
              </Link>
              <span>
                {post?.user?.status === "premium" && (
                  <span>
                    <MdVerified className="text-blue-600 w-4 h-4" />
                  </span>
                )}
              </span>
            </p>
            <span className="text-sm text-gray-500">
              {post?.createdAt && new Date(post?.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        <div>
          <PostDetailDropDown post={post} />
        </div>
      </div>
      <div className="px-3">
        <h1 className="text-white text-xl font-bold pt-4">{post?.title}</h1>
        <p className="text-gray-300 text-base pt-3 pb-6">{post?.content}</p>
        <PostDetailImageGallery images={post?.images ?? []} />
        <hr className="border-gray-600 mt-10" />
        <div className="py-1">{<PostAction post={post} />}</div>
        <div className="pb-5">
          <PostDetailCommentCard post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
