import PostDetails from "@/components/PostDetailPage/PostDetails";
import { getSinglePost } from "@/services/PostService";
import { TPost } from "@/types";
import Link from "next/link";
import React from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

interface PostId {
  params: {
    postId: string;
  };
}
const PostDetailsPage = async ({ params }: PostId) => {
  const { data: post } = await getSinglePost(params.postId);
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
        <PostDetails post={post as TPost} />
      </div>
    </div>
  );
};

export default PostDetailsPage;
