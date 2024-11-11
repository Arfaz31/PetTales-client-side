/* eslint-disable @typescript-eslint/no-explicit-any */

import { unlockPost } from "@/services/UnlockPost";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// export const useGetAllUnlockPost = () => {
//   return useQuery<any, Error, { data: TUnlockPost[] }>({
//     queryKey: ["GET_ALL_UNLOCK_POST"],
//     queryFn: async () => await getAllUnlockPost(),
//   });
// };
interface IResponse {
  postId: string;
}
export const useUserUnlockPost = () => {
  return useMutation<any, Error, IResponse>({
    mutationKey: ["GET_UNLOCK_POST"],
    mutationFn: async (data) => await unlockPost(data),
    onSuccess: (response) => {
      toast.success(
        "Verified process is started. Please confirm your payment to get access of this user content."
      );
      // Redirect user if payment URL is available
      if (response.success && response.data?.payment_url) {
        window.location.href = response.data.payment_url;
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
