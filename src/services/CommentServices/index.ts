/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/AxiosInstance";
import { revalidateTag } from "next/cache";

export const createComment = async () => {
  try {
    const { data } = await axiosInstance.post("/comment/create-comment");
    revalidateTag("comment");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/comment/update-comment/${commentId}`
    );
    revalidateTag("comment");
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
    revalidateTag("comment");
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
    revalidateTag("comment");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllComments = async (postId: string) => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get(
    `/comment/get-all-comment/${postId}`,
    fetchOptions
  );
  return data;
};

export const getTotalComments = async (postId: string) => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get(
    `/comment/get-total-comment/${postId}`,
    fetchOptions
  );
  return data;
};
