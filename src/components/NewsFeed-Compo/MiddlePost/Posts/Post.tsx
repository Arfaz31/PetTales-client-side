/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useGetMe } from "@/hooks/user.hook"; // Adjust accordingly
import { useGetAllPost } from "@/hooks/post.hook";
import { useSearchParams } from "next/navigation"; // Adjust the import accordingly
import PostCard from "./PostCard"; // Adjust the import
import PostCardSkeleton from "@/components/Skeleton/PostSkeleton"; // Adjust the import
import InfiniteScrollContainer from "@/components/Shared/InfiniteScrollContainer"; // Adjust the import
import { FaSpinner } from "react-icons/fa";
import PostFilter from "../PostSearchFilter/PostFilter";

const Post = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All Posts";

  const {
    data: postsData,
    isLoading: loadingPosts,
    fetchNextPage, // Function to fetch next page
    hasNextPage, // Whether there are more pages
    isFetchingNextPage, // Whether next page is currently being fetched
  } = useGetAllPost(undefined, category);

  // console.log("postsdata:", postsData);
  // postsData return- pageParams and pages[]. and pages return posts, hasMore, totalPages
  // pageParams: [1]
  // pages: Array(1)
  // 0: {posts: Array(8), hasMore: true, totalPages: 4}
  // length: 1

  const { data: user } = useGetMe();
  const userID = user?.data?._id;

  // Load more posts when the bottom is reached
  const loadMorePosts = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage(); // This fetches the next page of data
    }
  };

  // Reset posts when category changes
  useEffect(() => {
    if (postsData) {
      fetchNextPage(); // Trigger a fetch when category changes
    }
  }, [category, fetchNextPage, postsData]);

  if (loadingPosts && !postsData) {
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
        onBottomReached={loadMorePosts}
        isFetchingMore={isFetchingNextPage} // Adjust fetching indicator
      >
        {postsData?.pages?.map((pageData, index) =>
          pageData.posts.map((post: any) => (
            <PostCard
              key={`${post._id}-${index}`}
              post={post}
              userId={userID!}
              isUnlocked={post.isUnlockedBy?.includes(userID!)}
            />
          ))
        )}

        {/* Loading spinner when fetching more */}
        {isFetchingNextPage && (
          <div className="flex justify-center my-5 ">
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
