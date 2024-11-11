/* eslint-disable @typescript-eslint/no-explicit-any */
import { dislike, like, unDislike, unLike } from "@/services/LikeService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["USER_LIKE"],
    mutationFn: async (postId: string) => await like(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
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
    mutationFn: async (postId: string) => await dislike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const usePostUnlike = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["USER_UNLIKE"],
    mutationFn: async (postId: string) => await unLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const usePostUnDislike = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["USER_UNDISLIKE"],
    mutationFn: async (postId: string) => await unDislike(postId),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
