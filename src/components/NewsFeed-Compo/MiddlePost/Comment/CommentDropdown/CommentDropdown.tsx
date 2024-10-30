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

import { BiHide } from "react-icons/bi";
import {
  useDeleteCommentByAuthor,
  useDeleteCommentByPostOwner,
} from "@/hooks/comment.hook";
import GlassLoader from "@/components/Shared/Loading";
import UpdateCommentModal from "./UpdateCommentModal";

const CommentDropdown = ({ comment }: { comment: TComment }) => {
  const { user } = useUser();

  const {
    mutate: deleteCommentAsAuthor,
    isPending: isPendingForDeleteAuthorComment,
  } = useDeleteCommentByAuthor();
  const {
    mutate: deleteCommentAsPostOwner,
    isPending: isPendingForDeleteCommentAsPostOwner,
  } = useDeleteCommentByPostOwner();

  const handleDeleteCommentForAuthor = () => {
    deleteCommentAsAuthor(comment._id!);
  };

  const handleDeleteCommentAsPostOwner = () => {
    deleteCommentAsPostOwner({
      postId: comment.post._id!,
      commentId: comment._id!,
    });
  };

  const isCommentOwner = comment?.user?._id === user?._id;
  const isPostOwner = comment?.post?.user?._id === user?._id;

  return (
    <div>
      {/* Show GlassLoader as a full-screen overlay when loading */}
      {isPendingForDeleteAuthorComment ||
        (isPendingForDeleteCommentAsPostOwner && <GlassLoader />)}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="rounded-full cursor-pointer bg-[#16181C] p-2 flex items-center justify-center">
            <span className="text-white">
              <MdMoreVert />
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-65 bg-black shadow-lg shadow-gray-600 p-3 space-y-2">
          {isCommentOwner ? (
            <>
              <div className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none">
                <UpdateCommentModal comment={comment} />
              </div>

              <DropdownMenuItem
                onClick={handleDeleteCommentForAuthor}
                className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none"
              >
                <p className="flex items-center gap-3 text-white text-sm">
                  <MdDelete className="text-white" />
                  <span>Delete Comment</span>
                </p>
              </DropdownMenuItem>
            </>
          ) : isPostOwner ? (
            <>
              <DropdownMenuItem
                onClick={handleDeleteCommentAsPostOwner}
                className="w-full hover:bg-[#16181C] cursor-pointer p-2 border-none"
              >
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
            </>
          ) : (
            <>
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
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommentDropdown;
