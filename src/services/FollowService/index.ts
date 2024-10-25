/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/AxiosInstance";
import { revalidateTag } from "next/cache";

export const createFollow = async (userId: string) => {
  try {
    const { data } = await axiosInstance.patch(`/user/follow/${userId}`);
    revalidateTag("user");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const unFollow = async (userId: string) => {
  try {
    const { data } = await axiosInstance.patch(`/user/unfollow/${userId}`);
    revalidateTag("user");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
