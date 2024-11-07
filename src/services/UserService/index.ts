/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/AxiosInstance";
import { revalidateTag } from "next/cache";

export const getAllUser = async () => {
  const { data } = await axiosInstance.get("/user");
  return data;
};

export const getSingleUser = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const { data } = await axiosInstance.get(`/user/${userId}`);
    return data;
  } catch (error: any) {
    // console.error("Error fetching user:", error); // Log detailed error
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

export const getme = async () => {
  const { data } = await axiosInstance.get("/user/me");
  return data;
};

export const updateUser = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/user/update-profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidateTag("user");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }
};
