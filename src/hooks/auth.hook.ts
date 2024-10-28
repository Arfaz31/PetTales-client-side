/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  changePassword,
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration is successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User logged in successfully.");
    },
    onError: (error) => {
      console.log(error);
      toast.error("User login failed.");
    },
  });
};
export const useForgotPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (userData) => await forgetPassword(userData),
    onSuccess: () => {
      toast.success("Password reset link has been sent to your email.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async (resetPasswordData) =>
      await resetPassword(resetPasswordData),
    onSuccess: () => {
      toast.success("Password reset is successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (userData) => await changePassword(userData),
    onSuccess: () => {
      toast.success("Password Change is successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
