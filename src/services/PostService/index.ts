"use server";
import axiosInstance from "@/AxiosInstance";

export const getAllPosts = async () => {
  const { data } = await axiosInstance.get("/posts");
  return data;
};
export const getSinglePost = async (postId: string) => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);
  return data;
};
