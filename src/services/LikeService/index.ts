// likeServices
"use server";
import axiosInstance from "@/AxiosInstance";
import { revalidateTag } from "next/cache";

export const like = async (postId: string) => {
  const { data } = await axiosInstance.patch(`/postAction/like/${postId}`);
  revalidateTag("postAction");
  console.log("like");
  return data;
};

export const dislike = async (postId: string) => {
  const { data } = await axiosInstance.patch(`/postAction/dislike/${postId}`);
  revalidateTag("postAction");
  console.log("dislike");
  return data;
};

export const unLike = async (postId: string) => {
  const { data } = await axiosInstance.patch(`/postAction/unlike/${postId}`);
  revalidateTag("postAction");
  console.log("unlike");
  return data;
};

export const unDislike = async (postId: string) => {
  const { data } = await axiosInstance.patch(`/postAction/undislike/${postId}`);
  revalidateTag("postAction");
  console.log("undislike");
  return data;
};
