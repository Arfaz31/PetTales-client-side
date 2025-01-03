import { TPost } from "@/types";
import Image from "next/image";
import React from "react";
import userimage from "@/assets/user-2.png";

import { FaLock } from "react-icons/fa";

import Link from "next/link";
import { MdVerified, MdWorkspacePremium } from "react-icons/md";
import PostDropDown from "../NewsFeed-Compo/MiddlePost/PostDropdown/PostDropDown";
import ImageGallery from "../NewsFeed-Compo/MiddlePost/Posts/PostImage";
import UnlockPostDialog from "../NewsFeed-Compo/MiddlePost/PostModal/UnlockPostDialog";
import PostAction from "../NewsFeed-Compo/MiddlePost/Posts/PostAction";
import CommentCard from "../NewsFeed-Compo/MiddlePost/Comment/CommentCard";

const DataCard = ({
  post,
  userId,
  isUnlocked,
}: {
  post: TPost;
  userId: string;
  isUnlocked: boolean;
}) => {
  // Check if the current user is the owner of the post
  const isPostOwner = post?.user?._id === userId;

  return (
    <div className="min-h-[400px] border-b border-gray-600 py-5">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-3 xl:col-span-3 md:col-span-4 col-span-5">
          <Link
            href={`/newsfeed/userprofile/${post?.user?._id}`}
            className="rounded-full border-2 border-pink-600 cursor-pointer"
          >
            <Image
              src={post?.user?.profilePhoto || userimage}
              alt="user profile picture"
              width={35}
              height={35}
              className="rounded-full object-cover object-center w-10 h-10"
            />
          </Link>
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
        <div className="flex items-center gap-4">
          {post?.contentType === "premium" && (
            <p>
              <MdWorkspacePremium className="w-7 h-7 text-[#ff2793]" />
            </p>
          )}
          <PostDropDown post={post} isUnlocked={isUnlocked} />
        </div>
      </div>

      <div className="px-3">
        <h1 className="text-white text-xl font-bold pt-4">{post?.title}</h1>

        {/* Check if the post is premium, not unlocked, and the current user is not the owner */}
        {post?.contentType === "premium" && !isUnlocked && !isPostOwner ? (
          <>
            <p className="text-gray-300 text-base pt-3 pb-6">
              {post?.content?.slice(0, 100)}........
            </p>

            <div className="relative my-5">
              {/* Blurred image with lock icon */}
              <div className="blur-xl">
                <ImageGallery
                  images={post?.images ?? []}
                  postId={post?._id ?? ""}
                />
              </div>
              <div className="absolute inset-0 flex justify-center items-center cursor-pointer">
                <span className="text-gray-400 bg-white rounded-full p-4 border border-pink-500 text-lg font-bold ">
                  <FaLock className="w-12 h-12" />
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <UnlockPostDialog post={post} />
            </div>
          </>
        ) : (
          // Post is unlocked or it's a basic post
          <>
            <p className="text-gray-300 text-base pt-3 pb-6">
              {post?.content?.slice(0, 300)}.....
              <Link
                className="text-pink-600"
                href={`/newsfeed/posts/${post?._id}`}
              >
                See more
              </Link>
            </p>
            <ImageGallery
              images={post?.images ?? []}
              postId={post?._id ?? ""}
            />
            <hr className="border-gray-600 mt-10" />
            <div className="py-1">{<PostAction post={post} />}</div>
            <div>
              <CommentCard post={post} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataCard;
