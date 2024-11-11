"use client";
import React, { useState, useEffect } from "react";
import { TPost } from "@/types";
import PostFilter from "../PostSearchFilter/PostFilter";
import PostCard from "./PostCard";
import PostCardSkeleton from "@/components/Skeleton/PostSkeleton";
import { useGetMe } from "@/hooks/user.hook";
import { useGetAllPost } from "@/hooks/post.hook";
import { useSearchParams } from "next/navigation";
import InfiniteScrollContainer from "@/components/Shared/InfiniteScrollContainer";
import { FaSpinner } from "react-icons/fa";

const Post = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All Posts";
  // console.log("selected category:", category);

  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<TPost[]>([]); // Accumulated posts list
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data: postsData,
    isLoading: loadingPosts,
    isSuccess,
  } = useGetAllPost(undefined, category, page);
  const { data: user } = useGetMe();
  const userID = user?.data?._id;

  // Load more posts when bottom is reached

  const loadMorePosts = () => {
    if (!isFetchingMore && postsData?.hasMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Reset posts and page when category changes
  useEffect(() => {
    setAllPosts([]); // Reset accumulated posts
    setPage(1); // Reset page to 1
  }, [category]);

  // Append new posts when data is fetched successfully
  useEffect(() => {
    if (isSuccess && postsData?.posts) {
      setAllPosts((prevPosts) => [...prevPosts, ...postsData.posts]); // Append new posts
      if (!postsData?.hasMore) {
        setIsFetchingMore(false); // Stop fetching if no more posts
      } else {
        setIsFetchingMore(false); // Reset fetching state after appending posts
      }
    }
  }, [postsData, isSuccess]);

  // Display skeleton loaders while initial data loads
  if (loadingPosts && page === 1) {
    return (
      <div>
        <div className="pb-10"></div>
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

      <InfiniteScrollContainer
        className="pb-5"
        onBottomReached={loadMorePosts} // Call loadMorePosts when bottom is reached
        isFetchingMore={isFetchingMore} // if content is currently being fetched; it prevents duplicate fetch calls while new content is already loading.
      >
        {/* Render accumulated posts */}
        {allPosts.map((post: TPost, index) => (
          <PostCard
            key={`${post._id}-${index}`} // Combines ID with index for uniqueness
            post={post}
            userId={userID!}
            isUnlocked={post.isUnlockedBy?.includes(userID!)} // Check if unlocked for current user
          />
        ))}

        {/* Loading spinner when fetching more */}
        {isFetchingMore && (
          <div className="flex justify-center mt-5 mb-2">
            <div className="w-full h-[100px] flex items-start justify-center">
              <FaSpinner
                className="animate-spin text-pink-500 ease-in-out duration-2000"
                size={30}
              />
            </div>
          </div>
        )}
      </InfiniteScrollContainer>
    </div>
  );
};

export default Post;
