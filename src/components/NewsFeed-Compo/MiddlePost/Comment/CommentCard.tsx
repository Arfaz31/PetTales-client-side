import { useGetAllComments } from "@/hooks/comment.hook";
import Image from "next/image";
import React from "react";
import userimage from "@/assets/user-2.png";
import CommentDropdown from "./CommentDropdown/CommentDropdown";
import CommentInput from "./Comment-Input/CommentInput";

const CommentCard = ({ postId }: { postId?: string }) => {
  const { data: allcommentData } = useGetAllComments(postId!);
  const comments = allcommentData?.data || [];
  return (
    <div>
      <p className="text-base font-medium text-white py-2">Comments</p>
      <div>
        {allcommentData?.data?.slice(0, 2).map((comment) => (
          <div key={comment._id} className="flex items-center  gap-3 space-y-4">
            <div className="rounded-full border-2 border-pink-600 cursor-pointer">
              <Image
                src={comment?.user?.profilePhoto || userimage}
                alt="user profile picture"
                width={35}
                height={35}
                className="rounded-full object-cover object-center w-10 h-10"
              />
            </div>
            <div className="flex flex-col gap-1 bg-[#16181C] rounded-3xl py-2 ps-3 w-[70%]">
              <p className="text-white text-base font-semibold">
                {comment?.user?.name}
              </p>
              <p className="text-white text-sm ">{comment?.content}</p>
            </div>
            <div>
              <CommentDropdown comment={comment} />
            </div>
          </div>
        ))}
      </div>

      {comments.length > 2 && (
        <p className="text-base text-pink-600 font-medium py-3">View More</p>
      )}

      <div className="mt-6">
        <CommentInput postId={postId} />
      </div>
    </div>
  );
};

export default CommentCard;
