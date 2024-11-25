"use server";

import axiosInstance from "@/AxiosInstance";
import { TMessage } from "@/types";

export const getUserChats = async (id: string) => {
  const { data } = await axiosInstance.get(`/chat/userChats/${id}`);
  //   console.log("data from api", data);
  return data;
};
export const findChat = async (userId1: string, userId2: string) => {
  const { data } = await axiosInstance.get(
    `/chat/findSpecificChat/${userId1}/${userId2}`
  );

  return data;
};

export const getUserMessage = async (id: string) => {
  const { data } = await axiosInstance.get(`/message/getMessages/${id}`);
  //   console.log("data from api", data);
  return data;
};
export const addMessage = async (messageData: TMessage) => {
  try {
    const { data } = await axiosInstance.post(
      "/message/addMessage",
      messageData
    );
    return data;
  } catch (error) {
    return error;
  }
};
