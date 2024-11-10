/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/AxiosInstance";
import { revalidateTag } from "next/cache";

interface IResponse {
  amount: number;
}

export const getVerified = async (verifiedData: IResponse) => {
  try {
    const { data } = await axiosInstance.post("/statusUpgrade", verifiedData);
    revalidateTag("user");
    return data;
  } catch (error: any) {
    console.error(
      "Error in getVerified:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong with the payment process."
    );
  }
};
