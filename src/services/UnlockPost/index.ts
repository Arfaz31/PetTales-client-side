"use server";

import axiosInstance from "@/AxiosInstance";

export const getAllUnlockPost = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  try {
    const { data } = await axiosInstance.get("/unlockPost", fetchOptions);
    return data;
  } catch (error) {
    console.error("Failed to fetch unlock posts:", error);
    return { data: [] }; // Fallback to an empty array if there's an error
  }
};
