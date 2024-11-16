"use server";

import axiosInstance from "@/AxiosInstance";

export const getAllPostsForAdmin = async (
  searchTerm?: string,
  category?: string,
  contentType?: string,
  pageParam: number = 1,
  limit: number = 8
) => {
  const params: Record<string, string> = {
    page: pageParam.toString(),
    limit: limit.toString(),
  };

  if (searchTerm) params.searchTerm = searchTerm;
  if (category && category !== "All Posts") params.category = category;
  if (contentType && contentType !== "All Content")
    params.contentType = contentType;
  const { data } = await axiosInstance.get("/admin/allPosts", { params });

  return {
    posts: data.data.posts,
    hasMore: data.data.hasMore,
    totalPosts: data.data.totalPosts,
    totalPages: data.data.totalPages,
  };
};
