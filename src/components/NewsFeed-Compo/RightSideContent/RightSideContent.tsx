"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";
import WhoToFollow from "./WhoToFollow";
import Link from "next/link";
import { useGetAllPost } from "@/hooks/post.hook";
import useDebounce from "@/hooks/debounce.hook";
import Image from "next/image";
import { motion } from "framer-motion";
import { TPost } from "@/types";
import { useRouter } from "next/navigation";

const RightSideContent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: allPostsData } = useGetAllPost(debouncedSearchTerm);
  const posts = allPostsData?.data || [];
  const router = useRouter();

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");
    router.push(`/search-filter-output?search=${queryString}`);
  };

  const trendsData = [
    {
      id: 1,
      subtitle: "Pets-Trending",
      title: "#AdoptDontShop",
      post: "25k posts",
    },
    {
      id: 2,
      subtitle: "Dogs-Trending",
      title: "#GoldenRetrieverLove",
      post: "18k posts",
    },
    {
      id: 3,
      subtitle: "Cats-Trending",
      title: "#Caturday",
      post: "22k posts",
    },
    {
      id: 4,
      subtitle: "Birds-Trending",
      title: "#ParrotTalk",
      post: "9k posts",
    },
    {
      id: 5,
      subtitle: "Exotic Pets",
      title: "#ReptileCare",
      post: "12k posts",
    },
    {
      id: 6,
      subtitle: "Small Pets",
      title: "#HamsterLife",
      post: "7k posts",
    },
    {
      id: 7,
      subtitle: "Pet Adoption",
      title: "#RescueMission",
      post: "30k posts",
    },
    {
      id: 8,
      subtitle: "Aquatic Pets",
      title: "#FishTankGoals",
      post: "15k posts",
    },
  ];
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen   bg-black ps-4 w-full">
      <div className="sticky top-0 z-50">
        <div className="flex relative bg-black pb-4 ">
          <div className="w-full pt-3">
            <button type="submit" className="absolute ml-4 mt-3 mr-4">
              <FaSearch />
            </button>
            <input
              type="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Post"
              className="bg-[#202327] h-10 px-10 pr-5 w-full rounded-full text-sm shadow border-0"
            />
          </div>

          {debouncedSearchTerm && posts?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full mt-2 bg-black border  rounded-lg shadow-lg z-50 max-h-72 top-12 overflow-y-auto"
            >
              <div className="grid grid-cols-1 gap-3 p-2">
                {posts.slice(0, 4).map((post: TPost) => (
                  <Link
                    key={post._id}
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
                ))}
              </div>
              <div className="mt-3 flex justify-center border-t-1 border-default-50 py-3">
                <button
                  onClick={() => handleSeeAll(searchTerm)}
                  className="flex items-center justify-center gap-1 font-bold text-lg hover:text-pink-600"
                >
                  <span>See All</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div>
        <div className="border border-gray-600 rounded-lg p-3 my-5">
          <h2 className="text-2xl font-bold text-white">
            Subscribe to Premium
          </h2>
          <p className="text-white py-2">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue
          </p>
          <Link href={"/pricing"}>
            <button className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 text-lg font-bold  text-white text-center px-4 py-2 w-2/3">
              Subscribe
            </button>
          </Link>
        </div>

        <div className="border border-gray-600 rounded-lg p-3 mb-5">
          <h2 className="text-2xl font-bold text-white pb-5">Who to follow</h2>
          <div className="pb-10">
            <WhoToFollow />
          </div>
          <div className=" cursor-pointer pb-2">
            <Link href={"/friends"}>
              <span className="text-pink-600 hover:text-pink-300 text-lg  font-semibold">
                See More
              </span>
            </Link>
          </div>
        </div>

        <div className="border border-gray-600 rounded-lg p-3">
          <h2 className="text-2xl font-bold text-white pb-5">Trends for you</h2>
          <div className="space-y-5">
            {trendsData.map((trend) => (
              <div
                key={trend.id}
                className=" flex items-center justify-between "
              >
                <div>
                  <p className="text-gray-500 ">{trend.subtitle}</p>
                  <p className="text-white text-lg font-bold ">{trend.title}</p>
                  <p className="text-gray-500">{trend.post}</p>
                </div>
                <span className="text-white">
                  <FaEllipsis />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className=" my-5">
          <div className="flex-1">
            <p className="flex items-center gap-2">
              <span className="text-sm  font-medium text-gray-500">
                Terms of service
              </span>
              <span className="text-sm  font-medium text-gray-500">
                Privacy Policy
              </span>
              <span className="text-sm  font-medium text-gray-500">
                Cookie policy
              </span>
            </p>
          </div>
          <div className="flex-2">
            <p className="text-sm leading-6 font-medium text-gray-600">
              {" "}
              &copy; {currentYear} PETTALES, Inc.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RightSideContent;
