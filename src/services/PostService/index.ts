/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/AxiosInstance";
import { revalidateTag } from "next/cache";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/posts/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};

export const updatePost = async (
  formData: FormData,
  postId: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/update-post/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update post");
  }
};

export const getAllPosts = async () => {
  const { data } = await axiosInstance.get("/posts");
  return data;
};
export const getSinglePost = async (postId: string) => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);
  return data;
};
