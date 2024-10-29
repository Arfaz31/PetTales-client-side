/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUser, getme, getSingleUser } from "@/services/UserService";
import { TUser } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUser = () => {
  return useQuery<any, Error, { data: TUser[] }>({
    queryKey: ["GET_ALL_USER"],
    queryFn: async () => await getAllUser(),
  });
};
export const useGetMe = () => {
  return useQuery<any, Error, { data: TUser }>({
    queryKey: ["GET_ME"],
    queryFn: async () => await getme(),
  });
};

export const useGetSingleUser = (userId: string) => {
  return useQuery<any, Error, { data: TUser }>({
    queryKey: ["GET_SINGLE_USER"],
    queryFn: async () => await getSingleUser(userId),
  });
};
