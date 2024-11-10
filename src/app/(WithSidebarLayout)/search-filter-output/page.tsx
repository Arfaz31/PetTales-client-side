"use client";
import CommentCard from "@/components/NewsFeed-Compo/MiddlePost/Comment/CommentCard";
import PostDropDown from "@/components/NewsFeed-Compo/MiddlePost/PostDropdown/PostDropDown";
import PostAction from "@/components/NewsFeed-Compo/MiddlePost/Posts/PostAction";
import ImageGallery from "@/components/NewsFeed-Compo/MiddlePost/Posts/PostImage";
import { TPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import userimage from "@/assets/user-2.png";
import { FaSearch } from "react-icons/fa";
import { useGetAllPost } from "@/hooks/post.hook";
import PostCardSkeleton from "@/components/Skeleton/PostSkeleton";

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
          {data?.posts?.map((post: TPost) => (
            <div key={post?._id}>
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
                    <div className="flex flex-col">
                      <p>
                        <span className="text-sm text-white font-normal">
                          {post?.user?.name}
                        </span>
                      </p>
                      <span className="text-sm text-gray-500">
                        {post?.createdAt &&
                          new Date(post?.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <PostDropDown post={post} />
                  </div>
                </div>
                <div className="px-3">
                  <h1 className="text-white text-xl font-bold pt-4">
                    {post?.title}
                  </h1>
                  <p className="text-gray-300 text-base pt-3 pb-6">
                    {post?.content?.slice(0, 300)}...
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
                  <PostAction post={post} />
                  <CommentCard post={post} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilterOutputPage;
