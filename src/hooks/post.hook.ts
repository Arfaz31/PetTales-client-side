/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost, getAllPosts, updatePost } from "@/services/PostService";
import { TPost } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdatePostData {
  postId: string;
  formData: FormData;
}

export const useCreatePost = (onSuccessCallback?: () => void) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePost = (onSuccessCallback?: () => void) => {
  return useMutation<any, Error, UpdatePostData>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ postId, formData }) =>
      await updatePost(formData, postId), // Fix parameter order
    onSuccess: () => {
      toast.success("Post updated successfully");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllPost = () => {
  return useQuery<any, Error, { data: TPost[] }>({
    queryKey: ["GET_ALL_POST"],
    queryFn: async () => await getAllPosts(),
  });
};
