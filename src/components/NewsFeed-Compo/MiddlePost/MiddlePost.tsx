import Link from "next/link";
import React from "react";

import { FaEllipsisVertical } from "react-icons/fa6";
import CreatePost from "./PostModal/CreatePost";
import Post from "./Posts/Post";

const MiddlePost = () => {
  return (
    <div className=" md:border-x border-gray-600 min-h-screen  bg-black py-2">
      <div className=" sticky top-0 z-50 bg-black w-full md:block hidden">
        <div className="flex items-center w-full justify-between px-2 pb-2">
          <div>
            <h2 className="px-4 py-2 text-2xl font-bold text-white ">
              <Link href="/">Home</Link>
            </h2>
          </div>

          <div>
            <span className="text-white">
              <FaEllipsisVertical />
            </span>
          </div>
        </div>
        <hr className="border-gray-600" />
      </div>
      <div className="pt-3 md:px-2 px-0">
        <CreatePost />
      </div>
      <div>
        <Post />
      </div>
    </div>
  );
};

export default MiddlePost;
