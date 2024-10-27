/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/AxiosInstance";
import { revalidateTag } from "next/cache";

export const like = async (postId: string) => {
  try {
    const { data } = await axiosInstance.post(`/like/upvote/${postId}`);
    revalidateTag("postAction");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const disLike = async (postId: string) => {
  try {
    const { data } = await axiosInstance.post(`/like/downvote/${postId}`);
    revalidateTag("postAction");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getTotalLike = async (postId: string) => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  try {
    const { data } = await axiosInstance.get(
      `/like/upvotesCount/${postId}`,
      fetchOptions
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getTotalDisLike = async (postId: string) => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  try {
    const { data } = await axiosInstance.get(
      `/like/downvotesCount/${postId}`,
      fetchOptions
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postLikeCheck = async (postId: string) => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  try {
    const { data } = await axiosInstance.get(
      `/like/check-post-like/${postId}`,
      fetchOptions
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error checking post like status");
  }
};

export const postDislikeCheck = async (postId: string) => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  try {
    const { data } = await axiosInstance.get(
      `/like/check-post-dislike/${postId}`,
      fetchOptions
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error checking post dislike status");
  }
};
