/* eslint-disable @typescript-eslint/no-explicit-any */
import { getVerified } from "@/services/GetVerified";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface IResponse {
  amount: number;
}
export const useUserGetVerified = () => {
  return useMutation<any, Error, IResponse>({
    mutationKey: ["GET_VERIFIED"],
    mutationFn: async (data) => await getVerified(data),
    onSuccess: (response) => {
      toast.success(
        "Verified process is started. Please confirm your payment to verify your account."
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
