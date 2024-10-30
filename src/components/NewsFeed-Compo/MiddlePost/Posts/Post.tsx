/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
"use server";
import { TPost } from "@/types";
import React from "react";
import PostFilter from "../PostFilter";
import PostCard from "./PostCard";
// import { useGetAllPost } from "@/hooks/post.hook";
// import { useGetAllUnlockPost } from "@/hooks/unlockPost.hook";
// import PostCardSkeleton from "@/components/Skeleton/PostSkeleton";
import { getAllPosts } from "@/services/PostService";
import { getme } from "@/services/UserService";
import PostCardSkeleton from "@/components/Skeleton/PostSkeleton";

const Post = async () => {
  // const { data: postsData, isLoading: loadingPosts } = useGetAllPost();
  // const { data: unlockPostsData, isLoading: loadingUnlockPosts } =
  //   useGetAllUnlockPost();
  const { data: postsData, isLoading: loadingPosts } = await getAllPosts();

  const { data: user } = await getme();

  const { _id } = user;
  if (loadingPosts) {
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
        {postsData.length === 0 ? (
          <p className="text-gray-300 text-lg">No posts available.</p>
        ) : (
          postsData.map((post: TPost) => (
            <PostCard
              key={post?._id}
              post={post}
              isUnlocked={post.isUnlockedBy?.includes(_id)} // Check if unlocked
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
