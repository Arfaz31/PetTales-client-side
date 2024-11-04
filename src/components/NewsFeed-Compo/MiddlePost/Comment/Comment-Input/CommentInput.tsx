"use client";

import { useUser } from "@/context/user.provider";
import { useUserCreateComment } from "@/hooks/comment.hook";
import { TCommentResponse } from "@/types";
import Image from "next/image";
import React from "react";
import userimage from "@/assets/user-2.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiLogoTelegram } from "react-icons/bi";
const CommentInput = ({ postId }: { postId?: string }) => {
  const { user } = useUser();
  const { mutate: createComment, isPending } = useUserCreateComment();
  const { handleSubmit, reset, register } = useForm<TCommentResponse>();

  const onSubmit: SubmitHandler<TCommentResponse> = (data) => {
    createComment({ ...data, post: postId ?? " " });
    // console.log(data);
    reset();
  };

  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full border-2 border-pink-600 cursor-pointer">
        <Image
          src={user?.profilePhoto || userimage}
          alt="user profile picture"
          width={35}
          height={35}
          className="rounded-full object-cover object-center w-10 h-10"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3 w-full"
      >
        <textarea
          {...register("content")}
          placeholder="Write a comment"
          className="flex-grow text-sm text-gray-400 h-12 p-3 bg-[#16181C] rounded-md resize-none"
        />
        <button
          type="submit"
          className="bg-pink-600 text-white rounded-full p-2"
        >
          {isPending ? (
            <div className=" w-7  h-7 border-4 border-dashed rounded-full animate-spin  border-white"></div>
          ) : (
            <BiLogoTelegram className="w-6 h-6" />
          )}
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
