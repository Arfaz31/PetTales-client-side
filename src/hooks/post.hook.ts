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

interface MyPostDataResponse {
  data: {
    posts: TPost[];
    totalPages: number;
  };
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
    mutationFn: async ({ postId, formData }) =>
      await updatePost(formData, postId),

    onSuccess: () => {
      toast.success("Post updated successfully");

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
    queryKey: ["GET_ALL_POST", searchTerm || "", category, page],
    queryFn: () => getAllPosts(searchTerm, category, page),

    select: (data) => {
      return {
        posts: data.posts,
        hasMore: data.hasMore,
        totalPages: data.totalPages,
      };
    },
  });
};

export const useGetMyAllPost = (
  userId: string,
  category?: string,
  contentType?: string
) => {
  return useQuery<MyPostDataResponse, Error>({
    queryKey: ["GET_MY_ALL_POST", userId, category, contentType],
    queryFn: async () => await getMyAllPost(userId, category, contentType),
    // select: (data) => {
    //   console.log("Mypostdatafromhook:", data);
    //   console.log("postsdatafromhook:", data.posts);
    //   return {
    //     posts: data.posts,
    //     totalPages: data.totalPages,
    //   };
    // },
  });
};
