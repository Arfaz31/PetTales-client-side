import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MdDelete, MdMoreVert, MdReportProblem } from "react-icons/md";
import { useUser } from "@/context/user.provider";
import { TComment } from "@/types";
import { FaRegEdit } from "react-icons/fa";
import { BiHide } from "react-icons/bi";

const CommentDropdown = ({ comment }: { comment: TComment }) => {
  const { user } = useUser();

  const isCommentOwner = comment?.user?._id === user?._id;
  const isPostOwner = comment?.post?.user?._id === user?._id;

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
          {/* Conditionally rendering the menu items based on ownership */}
          {isCommentOwner ? (
            <div>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <FaRegEdit className="text-white" />
                  <span>Edit Comment</span>
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <MdDelete className="text-white" />
                  <span>Delete Comment</span>
                </p>
              </DropdownMenuItem>
            </div>
          ) : isPostOwner ? (
            <div>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <MdDelete className="text-white" />
                  <span>Delete Comment</span>
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <MdReportProblem className="text-white" />
                  <span>Report Comment</span>
                </p>
              </DropdownMenuItem>
            </div>
          ) : (
            <div>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <BiHide className="text-white" />
                  <span>Hide Comment</span>
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <p className="flex items-center gap-3 text-white text-sm">
                  <MdReportProblem className="text-white" />
                  <span>Report Comment</span>
                </p>
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommentDropdown;
