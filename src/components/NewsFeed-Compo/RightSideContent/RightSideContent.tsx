"use client";

import React from "react";
import { FaEllipsis } from "react-icons/fa6";
import WhoToFollow from "./WhoToFollow";
import Link from "next/link";

import PostFilter from "../MiddlePost/PostSearchFilter/PostFilter";
import PostSearch from "../MiddlePost/PostSearchFilter/PostSearch";

const RightSideContent = () => {
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
        <PostSearch />
      </div>

      <div>
        <div className="border border-gray-600 rounded-lg p-3 my-5">
          <h2 className="text-xl font-bold text-white pb-3">
            Filter out posts by category
          </h2>
          <div className="w-full">
            <PostFilter />
          </div>
        </div>
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
