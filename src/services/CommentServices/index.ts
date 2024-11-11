/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/AxiosInstance";
import { TCommentResponse, TUpdateComment } from "@/types";
import { revalidateTag } from "next/cache";

export const createComment = async (commentData: TCommentResponse) => {
  try {
    const { data } = await axiosInstance.post(
      "/comment/create-comment",
      commentData
    );
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateComment = async (updateCommentData: TUpdateComment) => {
  try {
    const { data } = await axiosInstance.patch(
      `/comment/update-comment/${updateCommentData.commentId}`,
      { content: updateCommentData.content }
    );
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteCommentByAuthor = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/comment/delete-comment/${commentId}`
    );
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteCommentByPostOwner = async (
  postId: string,
  commentId: string
) => {
  try {
    const { data } = await axiosInstance.delete(
      `/comment/post-owner-delete/${postId}/${commentId}`
    );
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
