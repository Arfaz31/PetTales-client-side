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

export const deletePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/delete/${postId}`);
    revalidateTag("posts");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// export const getAllPosts = async (searchTerm?: string, category?: string) => {
//   const params: Record<string, string> = {};

//   if (searchTerm) params.searchTerm = searchTerm;
//   if (category && category !== "All Post") params.category = category;

//   const { data } = await axiosInstance.get("/posts", { params });
//   return data;
// };

export const getAllPosts = async (
  searchTerm?: string,
  category?: string,
  page: number = 1,
  limit: number = 8
) => {
  const params: Record<string, string> = {
    page: page.toString(),
    limit: limit.toString(),
  };

  if (searchTerm) params.searchTerm = searchTerm;
  if (category && category !== "All Posts") params.category = category;

  const { data } = await axiosInstance.get("/posts", { params });
  // console.log("API Request Params:", params);
  // console.log("API Response:", data);
  // The data object now has the structure { posts, hasMore, totalPages }
  return {
    posts: data.data.posts,
    hasMore: data.data.hasMore,
    totalPages: data.data.totalPages,
  };
};

export const getSinglePost = async (postId: string) => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);
  return data;
};
export const getMyAllPost = async (userId: string) => {
  const { data } = await axiosInstance.get(`/posts/my-posts/${userId}`);
  return data;
};
