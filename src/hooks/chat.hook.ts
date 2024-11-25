/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addMessage,
  findChat,
  getUserChats,
  getUserMessage,
} from "@/services/ChatService";
import { IChat, IMessage, TChat, TMessage } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserChats = (userId: string) => {
  return useQuery<any, Error, { data: TChat[] }>({
    queryKey: ["GET_USER_CHATS"],
    queryFn: async () => await getUserChats(userId),
  });
};

export const useUserFindChat = (userId1: string, userId2: string) => {
  return useQuery<any, Error, { data: IChat }>({
    queryKey: ["GET_FIND_CHAT", userId1, userId2],
    queryFn: async () => await findChat(userId1, userId2),
  });
};

export const useUserAddMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, TMessage>({
    mutationKey: ["ADD_MESSAGE"],
    mutationFn: async (data) => await addMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_USER_MESSAGE"],
      });
    },
  });
};

export const useGetUserMessage = (chatId: string) => {
  return useQuery<any, Error, { data: IMessage[] }>({
    queryKey: ["GET_USER_MESSAGE"],
    queryFn: async () => await getUserMessage(chatId),
  });
};
