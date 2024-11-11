/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/AxiosInstance";
import { revalidateTag } from "next/cache";

// export const getAllUnlockPost = async () => {
//   let fetchOptions = {};
//   fetchOptions = {
//     cache: "no-store",
//   };
//   try {
//     const { data } = await axiosInstance.get("/unlockPost", fetchOptions);
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch unlock posts:", error);
//     return { data: [] }; // Fallback to an empty array if there's an error
//   }
// };

interface unlockPostResponse {
  postId: string;
}

export const unlockPost = async (unlockPostData: unlockPostResponse) => {
  try {
    const { data } = await axiosInstance.post("/unlockPost", unlockPostData);
    revalidateTag("user");
    return data;
  } catch (error: any) {
    console.error(
      "Error in unlockPost:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong with the payment process."
    );
  }
};
