"use client";

import React from "react";
import { FaRegComment, FaShare } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { TPost } from "@/types";
import {
  usePostDisLike,
  usePostLike,
  usePostUnlike,
  usePostUnDislike,
} from "@/hooks/like.hook";
import { useUser } from "@/context/user.provider";
import Link from "next/link";

interface PostActionProps {
  post: TPost;
}

const PostAction = ({ post }: PostActionProps) => {
  const { _id = "", like = [], disLike = [] } = post;
  const { user } = useUser();
  const userId = user?._id ?? "";

  // Check if the current user has liked or disliked the post
  const likeExists = like.some((user) => user._id === userId);
  const dislikeExists = disLike.some((user) => user._id === userId);

  const { mutate: likeFn } = usePostLike();
  const { mutate: unLikeFn } = usePostUnlike();
  const { mutate: disLikeFn } = usePostDisLike();
  const { mutate: unDislikeFn } = usePostUnDislike();

  const handleLike = () => {
    if (likeExists) {
      unLikeFn(_id, {});
    } else {
      likeFn(_id, {
        onSuccess: () => {
          if (dislikeExists) {
            unDislikeFn(_id); // Removes dislike if it exists
          }
        },
      });
    }
  };

  const handleDislike = () => {
    if (dislikeExists) {
      unDislikeFn(_id, {});
    } else {
      disLikeFn(_id, {
        onSuccess: () => {
          if (likeExists) {
            unLikeFn(_id); // Removes like if it exists
          }
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-3 py-2 text-white">
        <div className="flex items-center gap-1">
          <AiOutlineLike className={likeExists ? "text-blue-600" : ""} />
          <p>{like.length}</p>
        </div>
        <div className="flex items-center gap-1">
          <AiOutlineDislike className={dislikeExists ? "text-red-600" : ""} />
          <p>{disLike.length}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaRegComment />
          <p>{post.comments.length}</p>
        </div>
        <FaShare />
      </div>
      <hr className="border-gray-600" />

      <div className="flex items-center justify-between pt-4 pb-6">
        <button
          onClick={handleLike}
          className={`flex items-center justify-between gap-1 border-none transition-all ease-in-out duration-500 hover:scale-110 ${
            likeExists ? "text-blue-600" : "text-white hover:text-blue-600"
          }`}
        >
          <AiOutlineLike />
          Like
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center justify-between gap-1 border-none transition-all ease-in-out duration-500 hover:scale-110 ${
            dislikeExists ? "text-red-600" : "text-white hover:text-red-600"
          }`}
        >
          <AiOutlineDislike />
          Dislike
        </button>

        <Link href={`/newsfeed/posts/${post?._id}`}>
          <button className="flex items-center justify-between gap-1 text-white bg-transparent border-none hover:text-blue-600 transition-all ease-in-out duration-500 hover:scale-110">
            <FaRegComment />
            <span>Comment</span>
          </button>
        </Link>

        <button className="flex items-center justify-between gap-1 text-white bg-transparent border-none hover:text-blue-600 transition-all ease-in-out duration-500 hover:scale-110">
          <FaShare />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostAction;
