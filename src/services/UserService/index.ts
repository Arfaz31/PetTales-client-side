/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/AxiosInstance";

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
