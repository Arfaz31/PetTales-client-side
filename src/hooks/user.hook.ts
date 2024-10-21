/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUser, getme } from "@/services/UserService";
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
