"use server";
import axiosInstance from "@/AxiosInstance";

export const getAllPosts = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/posts", fetchOptions);
  return data;
};
