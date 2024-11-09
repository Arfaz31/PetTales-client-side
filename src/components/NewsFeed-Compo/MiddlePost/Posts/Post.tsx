/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TPost } from "@/types";
import React from "react";
import PostFilter from "../PostSearchFilter/PostFilter";
import PostCard from "./PostCard";
// import { getAllPosts } from "@/services/PostService";
// import { getme } from "@/services/UserService";
import PostCardSkeleton from "@/components/Skeleton/PostSkeleton";
import { useGetMe } from "@/hooks/user.hook";
import { useGetAllPost } from "@/hooks/post.hook";
import { useSearchParams } from "next/navigation";

const Post = () => {
  const searchParams = useSearchParams(); // Use useSearchParams to get the current query params
  const category = searchParams.get("category") || "All Post";

  // console.log("Selected category:", category);

  const { data: postsData, isLoading: loadingPosts } = useGetAllPost(
    undefined,
    category
  );
  const { data: user } = useGetMe();
  const userID = user?.data?._id;

  if (loadingPosts) {
    return (
      <div>
        <div className="pb-10 "></div>
        <hr className="border-gray-600" />

        <div className="pb-5 space-y-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-10 lg:block hidden"></div>
      <div className="py-8 lg:hidden block ms-2">
        <PostFilter />
      </div>
      <hr className="border-gray-600" />

      <div className="pb-5">
        {postsData?.data?.length === 0 ? (
          <p className="text-gray-300 text-lg">No posts available.</p>
        ) : (
          postsData?.data?.map((post: TPost) => (
            <PostCard
              key={post?._id}
              post={post}
              isUnlocked={post.isUnlockedBy?.includes(userID!)} // Check if unlocked
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
