/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TPost } from "@/types";
import React from "react";
import PostFilter from "../PostFilter";
import PostCard from "./PostCard";
import { useGetAllPost } from "@/hooks/post.hook";
import { useGetAllUnlockPost } from "@/hooks/unlockPost.hook";
import PostCardSkeleton from "@/components/Skeleton/PostSkeleton";

const Post = () => {
  const { data: postsData, isLoading: loadingPosts } = useGetAllPost();
  const { data: unlockPostsData, isLoading: loadingUnlockPosts } =
    useGetAllUnlockPost();

  const posts = postsData?.data || [];
  const unlockedPostIds =
    unlockPostsData?.data.map((unlock: any) => unlock.postId) || [];

  if (loadingPosts || loadingUnlockPosts) {
    return (
      <div>
        <div className="py-10 ps-4">
          <PostFilter />
        </div>
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
      <div className="py-10 ps-4">
        <PostFilter />
      </div>
      <hr className="border-gray-600" />

      <div className="pb-5">
        {posts.length === 0 ? (
          <p className="text-gray-300 text-lg">No posts available.</p>
        ) : (
          posts.map((post: TPost) => (
            <PostCard
              key={post?._id}
              post={post}
              isUnlocked={unlockedPostIds?.includes(post._id!)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
