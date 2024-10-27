/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  disLike,
  like,
  getTotalLike,
  getTotalDisLike,
  postLikeCheck,
  postDislikeCheck,
} from "@/services/LikeService";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["USER_LIKE"],
    mutationFn: async (postId: string) => await like(postId),
    onSuccess: (postId) => {
      // Update the cache directly
      queryClient.invalidateQueries({ queryKey: ["GET_TOTAL_LIKE", postId] });
      queryClient.invalidateQueries({
        queryKey: ["GET_TOTAL_DISLIKE", postId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const usePostDisLike = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["USER_DISLIKE"],
    mutationFn: async (postId: string) => await disLike(postId),
    onSuccess: (postId) => {
      // Update the cache directly
      queryClient.invalidateQueries({ queryKey: ["GET_TOTAL_LIKE", postId] });
      queryClient.invalidateQueries({
        queryKey: ["GET_TOTAL_DISLIKE", postId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetTotalLike = (postId: string) => {
  return useQuery<any, Error, { data: number }>({
    queryKey: ["GET_TOTAL_LIKE", postId], // Make it unique
    queryFn: async () => await getTotalLike(postId),
  });
};

export const useGetTotalDisLike = (postId: string) => {
  return useQuery<any, Error, { data: number }>({
    queryKey: ["GET_TOTAL_DISLIKE", postId], // Make it unique
    queryFn: async () => await getTotalDisLike(postId),
  });
};

export const useCheckPostLike = (postId: string) => {
  return useQuery<any, Error, { data: boolean }>({
    queryKey: ["POST_LIKE_CHECK", postId], // Include postId in query key
    queryFn: async () => await postLikeCheck(postId),
  });
};

export const useCheckPostDislike = (postId: string) => {
  return useQuery<any, Error, { data: boolean }>({
    queryKey: ["POST_DISLIKE_CHECK", postId], // Include postId in query key
    queryFn: async () => await postDislikeCheck(postId),
  });
};
