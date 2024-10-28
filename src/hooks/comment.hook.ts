/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createComment,
  deleteCommentByAuthor,
  deleteCommentByPostOwner,
  getAllComments,
  getTotalCommentsCount,
  updateComment,
} from "@/services/CommentServices";
import { TComment, TCommentResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserCreateComment = () => {
  return useMutation<any, Error, TCommentResponse>({
    mutationKey: ["USER_COMMENT"],
    mutationFn: async (commentData) => await createComment(commentData),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUserUpdateComment = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["USER_UPDATE_COMMENT"],
    mutationFn: async (commentId: string) => await updateComment(commentId),
    onSuccess: () => {
      toast.success("Comment is updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCommentByAuthor = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["USER_DELETE_COMMENT_BY_AUTHOR"],
    mutationFn: async (commentId: string) =>
      await deleteCommentByAuthor(commentId),
    onSuccess: () => {
      toast.success("Comment is deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCommentByPostOwner = () => {
  return useMutation<any, Error, { postId: string; commentId: string }>({
    mutationKey: ["USER_DELETE_COMMENT_BY_POSTOWNER"],
    mutationFn: async ({ postId, commentId }) =>
      await deleteCommentByPostOwner(postId, commentId),
    onSuccess: () => {
      toast.success("Comment is deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllComments = (postId: string) => {
  return useQuery<any, Error, { data: TComment[] }>({
    queryKey: ["GET_ALL_COMMENTS_BY_POSTID", postId],
    queryFn: async () => await getAllComments(postId),
  });
};

export const useGetTotalCommentsCount = (postId: string) => {
  return useQuery<any, Error, { data: number }>({
    queryKey: ["GET_TOTAL_COMMENTS_COUNT_BY_POSTID", postId],
    queryFn: async () => await getTotalCommentsCount(postId),
  });
};
