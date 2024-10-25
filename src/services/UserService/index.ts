/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/AxiosInstance";

export const getAllUser = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/user", fetchOptions);
  return data;
};

export const getSingleUser = async (userId: string) => {
  try {
    let fetchOptions = {};
    fetchOptions = {
      cache: "no-store",
    };
    const { data } = await axiosInstance.get(`/user/${userId}`, fetchOptions);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getme = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/user/me", fetchOptions);
  return data;
};
