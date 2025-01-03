// likeServices
"use server";
import axiosInstance from "@/AxiosInstance";
import { revalidateTag } from "next/cache";

export const like = async (postId: string) => {
  const { data } = await axiosInstance.patch(`/postAction/like/${postId}`);
  revalidateTag("posts");

  return data;
};

export const dislike = async (postId: string) => {
  const { data } = await axiosInstance.patch(`/postAction/dislike/${postId}`);
  revalidateTag("posts");

  return data;
};

export const unLike = async (postId: string) => {
  const { data } = await axiosInstance.patch(`/postAction/unlike/${postId}`);
  revalidateTag("posts");

  return data;
};

export const unDislike = async (postId: string) => {
  const { data } = await axiosInstance.patch(`/postAction/undislike/${postId}`);
  revalidateTag("posts");
  return data;
};
