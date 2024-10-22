"use server";

import axiosInstance from "@/AxiosInstance";

export const getAllUnlockPost = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/unlockPost", fetchOptions);
  return data;
};
