/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyAllPost,
  updatePost,
} from "@/services/PostService";
import { TPost } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

interface UpdatePostData {
  postId: string;
  formData: FormData;
}

interface IPostResponse {
  posts: TPost[];
  hasMore: boolean;
  totalPages: number;
}

export const useCreatePost = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePost = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, UpdatePostData>({
    mutationKey: ["UPDATE_POST"],
    // mutationFn: async ({ postId, formData }) =>
    //   await updatePost(formData, postId), // Fix parameter order
    mutationFn: async ({ postId, formData }) => {
      const response = await updatePost(formData, postId);
      console.log("Post updated:", response);
      return response;
    },
    onSuccess: async () => {
      toast.success("Post updated successfully");

      await queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
      });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postId: string) => await deletePost(postId),
    onSuccess: () => {
      toast.success("Post is deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllPost = (
  searchTerm?: string,
  category?: string,
  page: number = 1
) => {
  return useQuery<IPostResponse, Error>({
    queryKey: ["GET_ALL_POST"],
    // queryFn: () => getAllPosts(searchTerm, category, page),
    queryFn: () => {
      console.log("Fetching Allposts");

      return getAllPosts(searchTerm, category, page);
    },
    select: (data) => {
      return {
        posts: data.posts,
        hasMore: data.hasMore,
        totalPages: data.totalPages,
      };
    },
  });
};

export const useGetMyAllPost = (userId: string) => {
  return useQuery<any, Error, { data: TPost[] }>({
    queryKey: ["GET_MY_ALL_POST", userId],
    queryFn: async () => await getMyAllPost(userId),
  });
};
