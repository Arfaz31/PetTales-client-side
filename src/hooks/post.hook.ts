/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyAllPost,
  updatePost,
} from "@/services/PostService";
import { TPost } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdatePostData {
  postId: string;
  formData: FormData;
}

// interface IPostResponse {
//   posts: TPost[];
//   totalPages: number;
// }

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

export const useUserDeletePost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postId: string) => await deletePost(postId),
    onSuccess: () => {
      toast.success("Post is deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllPost = (searchTerm?: string, category?: string) => {
  return useQuery<{ data: TPost[] }, Error>({
    queryKey: ["GET_ALL_POST", searchTerm || "", category],
    queryFn: () => getAllPosts(searchTerm, category),
  });
};

// export const useGetAllPosts = (searchTerm?: string, category?: string) => {
//   const limit = 6; // Define limit here or pass as a parameter if needed

//   return useInfiniteQuery({
//     queryKey: ["GET_ALL_POST", searchTerm, category],
//     queryFn: ({ pageParam = 1 }) =>
//       getAllPosts(searchTerm, category, pageParam, limit),
//     getNextPageParam: (lastPage) => {
//       const { totalPages } = lastPage; // Only use totalPages
//       return totalPages > 1 ? lastPage.page + 1 : undefined; // Adjust based on totalPages
//     },
//     initialPageParam: 1, // Define the initial page parameter
//   });
// };

export const useGetMyAllPost = (userId: string) => {
  return useQuery<any, Error, { data: TPost[] }>({
    queryKey: ["GET_MY_ALL_POST", userId],
    queryFn: async () => await getMyAllPost(userId),
  });
};
