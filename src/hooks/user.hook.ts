/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllUser,
  getme,
  getSingleUser,
  updateUser,
} from "@/services/UserService";
import { TUser } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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
    queryKey: ["GET_SINGLE_USER", userId],
    queryFn: async () => await getSingleUser(userId),
  });
};

export const useUpdateUser = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (formData) => await updateUser(formData),
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
