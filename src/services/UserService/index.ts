/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/AxiosInstance";

export const getAllUser = async () => {
  const { data } = await axiosInstance.get("/user");
  return data;
};

export const getSingleUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/user/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getme = async () => {
  const { data } = await axiosInstance.get("/user/me");
  return data;
};
