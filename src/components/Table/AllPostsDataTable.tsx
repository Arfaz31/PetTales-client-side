import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import {
  useUserUpdatePostAsPublished,
  useUserUpdatePostAsUnpublished,
} from "@/hooks/post.hook";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";
import { TPost } from "@/types";
import Image from "next/image";
import userDefaultImage from "@/assets/user (3).png";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { useGetAllPostForAdmin } from "@/hooks/admin.hook";
import InfiniteScrollContainer from "../Shared/InfiniteScrollContainer";

const ALLUsersPostsDataTable = () => {
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: "publish" | "unpublish" | null;
  }>({});

  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All Posts";
  const contentType = searchParams.get("contentType") || "All Content";

  const {
    data: AllPostData,
    isLoading,
    fetchNextPage,
    // hasNextPage,
    isFetchingNextPage,
  } = useGetAllPostForAdmin(undefined, category, contentType);

  const posts = AllPostData?.pages?.flatMap((page) => page.posts) || [];

  const { mutate: updatePostAsPublished } = useUserUpdatePostAsPublished();
  const { mutate: updatePostAsUnpublished } = useUserUpdatePostAsUnpublished();

  const handleAction = (id: string, action: "publish" | "unpublish") => {
    setLoadingStates((prev) => ({ ...prev, [id]: action }));
    const mutateFn =
      action === "publish" ? updatePostAsPublished : updatePostAsUnpublished;
    console.log("action", action);
    console.log("id", id);
    mutateFn(id, {
      onSuccess: () => {
        toast.success(`Post updated as ${action}ed successfully`);
      },
      onError: () => {
        toast.error(`Failed to update post as ${action}ed`);
      },
      onSettled: () => {
        setLoadingStates((prev) => ({ ...prev, [id]: null }));
      },
    });
  };

  return (
    <div>
      <div className="xl:w-full w-[900px]">
        <InfiniteScrollContainer
          className="pb-5"
          onBottomReached={fetchNextPage}
          isFetchingMore={isFetchingNextPage}
        >
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  "User PP",
                  "User Name",
                  "User Role",
                  "User Status",
                  "Image",
                  "Title",
                  "Category",
                  "Content-Type",
                  "Price",
                  "Status",
                  "Action",
                ].map((header) => (
                  <TableHead
                    key={header}
                    className="font-semibold text-base min-w-[130px]"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-20">
                    <div className="flex items-center justify-center w-full h-14">
                      <Lottie animationData={spinner} loop={true} />
                    </div>
                  </TableCell>
                </TableRow>
              ) : posts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-20 text-gray-500 text-xl font-semibold"
                  >
                    No posts available
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post: TPost) => (
                  <TableRow key={post?._id}>
                    <TableCell>
                      <Image
                        src={post?.user?.profilePhoto || userDefaultImage}
                        width={80}
                        height={80}
                        className="w-12 h-12 rounded-xl object-cover"
                        alt={`Profile of ${post?.user?.name}`}
                      />
                    </TableCell>
                    <TableCell>{post?.user?.name}</TableCell>
                    <TableCell>
                      {post?.user?.role === "admin" ? "Admin" : "User"}
                    </TableCell>
                    <TableCell>
                      {post?.user?.status === "basic" ? "Basic" : "Premium"}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={
                          post?.images?.[0] ||
                          "https://static.thenounproject.com/png/4595376-200.png"
                        }
                        width={80}
                        height={80}
                        className="w-12 h-12 rounded-xl"
                        alt={`Post titled ${post.title}`}
                      />
                    </TableCell>
                    <TableCell className="min-w-[250px]">
                      {post?.title}
                    </TableCell>
                    <TableCell>{post?.category}</TableCell>
                    <TableCell>{post?.contentType}</TableCell>
                    <TableCell className="">{post?.price || "0"} tk</TableCell>
                    <TableCell>
                      {post?.isPublished ? "Published" : "Unpublished"}
                    </TableCell>
                    <TableCell className="flex items-center gap-3">
                      <button
                        onClick={() => handleAction(post._id!, "publish")}
                        disabled={
                          loadingStates[post._id!] === "publish" ||
                          post?.isPublished
                        }
                        className={`flex text-sm items-center justify-center gap-2 bg-[#23ff2e]  w-[120px] h-11 p-3 relative group overflow-hidden
                        ${
                          post?.isPublished
                            ? " cursor-not-allowed opacity-70"
                            : ""
                        }`}
                      >
                        {loadingStates[post._id!] === "publish" ? (
                          <div className=" w-7  h-7 border-4 border-dashed rounded-full animate-spin  border-white"></div>
                        ) : (
                          <div>
                            <span className="relative z-10">Publish</span>
                            {post?.isPublished === false && (
                              <span className="absolute inset-0 bg-[#12ae1a] transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                            )}
                          </div>
                        )}
                      </button>
                      <button
                        onClick={() => handleAction(post._id!, "unpublish")}
                        disabled={
                          loadingStates[post._id!] === "unpublish" ||
                          !post?.isPublished
                        }
                        className={`flex text-sm items-center justify-center gap-2 bg-[#ff2a2a] text-white w-[120px] h-11 p-3 relative group overflow-hidden ${
                          !post?.isPublished
                            ? " cursor-not-allowed opacity-70"
                            : ""
                        }`}
                      >
                        {loadingStates[post._id!] === "unpublish" ? (
                          <div className=" w-7  h-7 border-4 border-dashed rounded-full animate-spin  border-white"></div>
                        ) : (
                          <div>
                            <span className="relative z-10">UnPublish</span>
                            {post?.isPublished === true && (
                              <span className="absolute inset-0 bg-[#cb1313] transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                            )}
                          </div>
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
              <TableRow>
                <TableCell colSpan={7} className="text-center ">
                  {isFetchingNextPage && (
                    <div className="flex justify-center my-5">
                      <FaSpinner
                        className="animate-spin text-pink-500"
                        size={30}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </InfiniteScrollContainer>
      </div>
    </div>
  );
};

export default ALLUsersPostsDataTable;
