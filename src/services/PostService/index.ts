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

export const getAllPosts = async (
  searchTerm?: string,
  category?: string,
  pageParam: number = 1,
  limit: number = 8
) => {
  const params: Record<string, string> = {
    page: pageParam.toString(),
    limit: limit.toString(),
  };

  if (searchTerm) params.searchTerm = searchTerm;
  if (category && category !== "All Posts") params.category = category;

  const { data } = await axiosInstance.get("/posts", { params });

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

export const getMyAllPost = async (
  userId: string,
  category?: string,
  contentType?: string
  // page: number = 1,
  // limit: number = 8
) => {
  const params: Record<string, string> = {
    // page: page.toString(),
    // limit: limit.toString(),
  };

  if (category && category !== "All Posts") params.category = category;
  if (contentType && contentType !== "All Content")
    params.contentType = contentType;

  const { data } = await axiosInstance.get(`/posts/my-posts/${userId}`, {
    params,
  });
  // console.log("API response data:", data);
  return data;
};

export const getMyPremiumPosCount = async () => {
  const { data } = await axiosInstance.get(`/posts/myPremium-postCount`);
  return data;
};

export const getUnlockingUsersAndEarnings = async () => {
  const { data } = await axiosInstance.get(
    "/posts/unlocking-users-and-earnings"
  );

  return data;
};
export const getMyUnlockPosts = async () => {
  const { data } = await axiosInstance.get("/posts/myUnlockPosts");

  return data;
};
