/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FieldValues } from "react-hook-form";

import axiosInstance from "@/AxiosInstance";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || "Failed to Register");
    return error;
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || "Failed to login");
    // console.log("error from api:", error);
    return error;
  }
};

export const forgetPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forget-password",
      userData
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetPassword = async (resetPasswordData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      {
        newPassword: resetPasswordData.newPassword,
        email: resetPasswordData.email,
      },
      {
        headers: {
          Authorization: resetPasswordData.token,
        },
      }
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  // console.log("logout");
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  //decode token
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      username: decodedToken.username,
      email: decodedToken.email,
      role: decodedToken.role,
      status: decodedToken.status,
      profilePhoto: decodedToken.profilePhoto,
    };
  }

  return decodedToken;
};

//get new access token from refresh token
export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to get new access token");
  }
};

export const changePassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      userData
    );
    return data;
  } catch (error: any) {
    // throw new Error(
    //   error.response?.data?.message || "Failed to change password"
    // );
    return error;
  }
};
