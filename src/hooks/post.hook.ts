/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPosts } from "@/services/PostService";
import { TPost } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPost = () => {
  return useQuery<any, Error, { data: TPost[] }>({
    queryKey: ["GET_ALL_POST"],
    queryFn: async () => await getAllPosts(),
  });
};
