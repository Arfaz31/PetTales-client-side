/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFollow, unFollow } from "@/services/FollowService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserFollow = () => {
  const queryClient = useQueryClient(); // Access the query client to invalidate queries

  return useMutation<any, Error, string>({
    mutationFn: async (userId: string) => await createFollow(userId),
    onSuccess: () => {
      toast.success("User followed successfully");

      // Pass the query key as an array for better typing support
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_USER"] });
      queryClient.invalidateQueries({ queryKey: ["GET_SINGLE_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserUnFollow = () => {
  const queryClient = useQueryClient(); // Access the query client to invalidate queries

  return useMutation<any, Error, string>({
    mutationFn: async (userId: string) => await unFollow(userId),
    onSuccess: () => {
      toast.success("User unfollowed successfully");

      // Pass the query key as an array for better typing support
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_USER"] });
      queryClient.invalidateQueries({ queryKey: ["GET_SINGLE_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
