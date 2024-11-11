/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createComment,
  deleteCommentByAuthor,
  deleteCommentByPostOwner,
  updateComment,
} from "@/services/CommentServices";
import { TCommentResponse, TUpdateComment } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, TCommentResponse>({
    mutationKey: ["USER_COMMENT"],
    mutationFn: async (commentData) => await createComment(commentData),
    onSuccess: () => {
      toast.success("Comment is created successfully");
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUserUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, TUpdateComment>({
    mutationKey: ["USER_UPDATE_COMMENT"],
    mutationFn: async (updateCommentData) =>
      await updateComment(updateCommentData),
    onSuccess: () => {
      toast.success("Comment is updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCommentByAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["USER_DELETE_COMMENT_BY_AUTHOR"],
    mutationFn: async (commentId: string) =>
      await deleteCommentByAuthor(commentId),
    onSuccess: () => {
      toast.success("Comment is deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCommentByPostOwner = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { postId: string; commentId: string }>({
    mutationKey: ["USER_DELETE_COMMENT_BY_POSTOWNER"],
    mutationFn: async ({ postId, commentId }) =>
      await deleteCommentByPostOwner(postId, commentId),
    onSuccess: () => {
      toast.success("Comment is deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POST"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
