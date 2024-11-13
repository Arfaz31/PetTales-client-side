"use client";

import { TPost } from "@/types";

import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useGetAllPost } from "@/hooks/post.hook";
import PostCardSkeleton from "@/components/Skeleton/PostSkeleton";
import DataCard from "@/components/Shared/PostDataCard";
import { useGetMe } from "@/hooks/user.hook";

const SearchFilterOutputPage = ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  // Initialize search term state
  const [searchTerm, setSearchTerm] = useState(searchParams.search || "");
  const [currentSearchTerm, setCurrentSearchTerm] = useState(
    searchParams.search || ""
  );

  // Fetch posts with the current search term
  const { data, isLoading } = useGetAllPost(currentSearchTerm);
  const { data: user } = useGetMe();
  const userId = user?.data?._id;

  // Update the search term when the user types in the input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Trigger search when the user presses Enter
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentSearchTerm(searchTerm);
  };

  return (
    <div className="md:border-x border-gray-600 min-h-screen bg-black py-2">
      <div className="sticky top-0 z-50 bg-black w-full md:block hidden">
        <div className="w-full px-4 pb-2">
          <div className="flex gap-14 items-center">
            <Link href="/newsfeed" className="pt-2">
              <FaArrowLeftLong className="text-white w-7 h-7" />
            </Link>
            <form className="w-full pt-3" onSubmit={handleSearchSubmit}>
              <button type="submit" className="absolute ml-4 mt-3 mr-4">
                <FaSearch />
              </button>
              <input
                type="search"
                name="search"
                placeholder="Search Post"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-[#202327] h-10 px-10 pr-5 w-full rounded-full text-sm shadow border-0"
              />
            </form>
          </div>
        </div>
        <hr className="border-gray-600" />
      </div>

      {isLoading ? (
        <div>
          <div className="pb-10"></div>
          <hr className="border-gray-600" />
          <div className="pb-5 space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="py-3">
          {data?.posts?.map((post: TPost, index) => (
            <div key={`${post._id}-${index}`}>
              <DataCard
                post={post}
                userId={userId!}
                isUnlocked={post.isUnlockedBy?.includes(userId!)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilterOutputPage;
