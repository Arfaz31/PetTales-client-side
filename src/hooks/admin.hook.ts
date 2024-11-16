/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPostsForAdmin } from "@/services/AdminService";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetAllPostForAdmin = (
  searchTerm?: string,
  category?: string,
  contentType?: string
) => {
  return useInfiniteQuery<any, Error>({
    queryKey: ["GET_ALL_POST", searchTerm || "", category, contentType],
    queryFn: ({ pageParam = 1 }) =>
      getAllPostsForAdmin(
        searchTerm,
        category,
        contentType,
        pageParam as number
      ),
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more pages available
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1, // Explicitly set initialPageParam to 1
  });
};
