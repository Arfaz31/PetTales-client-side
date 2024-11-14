import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useGetMyAllPost } from "@/hooks/post.hook";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";
import { TPost } from "@/types";
import Image from "next/image";
import DeletePost from "@/components/NewsFeed-Compo/MiddlePost/PostModal/DeletePost";
import { useUser } from "@/context/user.provider";
const MyPostsDataTable = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All Posts";
  const contentType = searchParams.get("contentType") || "All Content";
  const { user } = useUser();

  const { data: myPostData, isLoading } = useGetMyAllPost(
    user?._id ?? "",
    category,
    contentType
  );

  // console.log("mypostdata:", myPostData);
  const { posts } = myPostData?.data || {};

  return (
    <div className="xl:w-full w-[900px] ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-base">Image</TableHead>
            <TableHead className="font-semibold text-base">Title</TableHead>
            <TableHead className="font-semibold text-base">Category</TableHead>
            <TableHead className="font-semibold text-base">
              Content-Type
            </TableHead>
            <TableHead className="font-semibold text-base">price</TableHead>
            <TableHead className="font-semibold text-base">
              isPublished
            </TableHead>
            <TableHead className="font-semibold text-base">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-20">
                <div className="  flex items-center justify-center w-full h-14 ">
                  <Lottie animationData={spinner} loop={true} />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            posts?.map((post: TPost) => {
              return (
                <TableRow key={post?._id}>
                  <TableCell>
                    <Image
                      key={post?._id}
                      src={
                        post.images[0] ||
                        "https://static.thenounproject.com/png/4595376-200.png"
                      }
                      width={80}
                      height={80}
                      className="w-12 h-12 rounded-xl"
                      alt={`Image for ${post.title}`}
                    />
                  </TableCell>
                  <TableCell>{post?.title}</TableCell>
                  <TableCell>{post?.category}</TableCell>
                  <TableCell>{post?.contentType}</TableCell>
                  <TableCell className="text-center">
                    {post?.price || "0"} tk
                  </TableCell>
                  <TableCell>
                    {post?.isPublished ? "Published" : "Unpublished"}
                  </TableCell>
                  <TableCell className="flex items-center">
                    <DeletePost
                      postId={post?._id ?? ""}
                      triggerElement={
                        <button
                          className={` flex  items-center justify-center rounded-md  bg-[#ff3434] text-white  p-3 relative group overflow-hidden`}
                        >
                          <Trash2 className="text-white w-5 h-5 z-10" />
                          <span className="absolute inset-0 bg-[#ff1717] transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                        </button>
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyPostsDataTable;
