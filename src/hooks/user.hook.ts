/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllUser,
  getme,
  getSingleUser,
  updateUser,
  updateUserRoleByAdmin,
} from "@/services/UserService";
import { TUpdateUserRole, TUser } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllUser = (role?: string, status?: string) => {
  return useQuery<any, Error, { data: TUser[] }>({
    queryKey: ["GET_ALL_USER", role, status],
    queryFn: async () => await getAllUser(role, status),
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
export const useUpdateUserRole = () => {
  return useMutation<any, Error, TUpdateUserRole>({
    mutationKey: ["UPDATE_USER_ROLE"],
    mutationFn: async (updateData) => await updateUserRoleByAdmin(updateData),
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
