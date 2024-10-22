"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MdDelete, MdMoreVert, MdReportProblem } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FaCopy, FaRegEdit } from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import { TPost } from "@/types";
import { useUser } from "@/context/user.provider";

const PostDropDown = ({ post }: { post: TPost }) => {
  const { user } = useUser();

  // Condition to check if the current user is the owner of the post
  const isPostOwner = post?.user?._id === user?._id;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="rounded-full cursor-pointer bg-[#16181C] p-2 flex items-center justify-center">
            <span className="text-white">
              <MdMoreVert />
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-65 bg-black shadow-lg shadow-gray-600 p-3 space-y-2">
          <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
            <p className="flex items-center gap-3 text-white text-sm">
              <TbListDetails className="text-white" />
              <p>View Details</p>
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
            <p className="flex items-center gap-3 text-white text-sm">
              <FaCopy className="text-white" />
              <p>Copy Link</p>
            </p>
          </DropdownMenuItem>

          {/* Conditionally rendering the menu items based on the post owner */}
          {isPostOwner ? (
            <div>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <FaRegEdit className="text-white" />
                  <p>Edit Post</p>
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <MdDelete className="text-white" />
                  <p>Delete Post</p>
                </p>
              </DropdownMenuItem>
            </div>
          ) : (
            // Render the Unfollow/Report options if the user does not own the post
            <div>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <RiUserUnfollowFill className="text-white" />
                  <p>Unfollow {post?.user?.name}</p>
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <MdReportProblem className="text-white" />
                  <p>Report Post</p>
                </p>
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PostDropDown;
