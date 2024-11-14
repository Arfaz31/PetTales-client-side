import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { TPost } from "@/types";
import useDebounce from "@/hooks/debounce.hook";
import { useGetAllPost } from "@/hooks/post.hook";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PostSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: pagesData } = useGetAllPost(debouncedSearchTerm);

  const router = useRouter();

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");
    router.push(`/search-filter-output?searchTerm=${queryString}`);
  };

  // Helper function to determine if any posts were found
  const hasPosts =
    pagesData?.pages?.some((page) => page?.posts?.length > 0) ?? false;

  return (
    <div>
      <div className="flex relative bg-black pb-4">
        <div className="w-full pt-3">
          <button type="submit" className="absolute ml-4 mt-3 mr-4">
            <FaSearch className="text-white" />
          </button>
          <input
            type="search"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Post"
            className="bg-[#202327] h-10 px-10 pr-5 w-full rounded-full text-white text-sm shadow border-0"
          />
        </div>

        {/* Conditional rendering of the search results */}
        {debouncedSearchTerm && pagesData?.pages && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full mt-2 bg-black border rounded-lg shadow-lg z-50 max-h-72 top-12 overflow-y-auto"
          >
            <div className="grid grid-cols-1 gap-3 p-2">
              {/* Iterate over pages and display posts */}
              {pagesData?.pages.map((PostData, index) => {
                if (PostData?.posts?.length > 0) {
                  return PostData.posts.slice(0, 4).map((post: TPost) => (
                    <Link
                      key={`${post._id}-${index}`}
                      href={`/newsfeed/posts/${post._id}`}
                      onClick={() => setSearchTerm("")}
                      className="py-2 px-4 text-sm cursor-pointer hover:bg-[#16181C] rounded-md border border-default-100"
                    >
                      <div className="flex items-center gap-8">
                        <Image
                          src={post?.images?.[0] || ""}
                          alt="user profile picture"
                          width={35}
                          height={35}
                          className="rounded-2xl object-cover object-center w-14 h-14"
                        />
                        <div>
                          <p className="text-gray-300 text-sm font-bold">
                            {post.title}
                          </p>
                          <p className="text-gray-300 text-xs pt-2">
                            {post.content?.slice(0, 40)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  ));
                }
                return null; // Return null if no posts in this page
              })}

              {/* If no posts found */}
              {!hasPosts && (
                <div className="text-center text-gray-500 text-sm py-3">
                  No data found
                </div>
              )}
            </div>

            {/* Only show "See All" if there are search results */}
            {hasPosts && (
              <div className="mt-3 flex justify-center border-t-1 border-default-50 py-3">
                <button
                  onClick={() => handleSeeAll(searchTerm)}
                  className="flex items-center justify-center gap-1 font-bold text-lg text-white hover:text-pink-600"
                >
                  <span>See All</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PostSearch;
