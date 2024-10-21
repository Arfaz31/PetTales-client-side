"use client";
import { useGetMe } from "@/hooks/user.hook";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading.json";

const AccountInfo = () => {
  const { data, isLoading } = useGetMe();
  const user = data?.data;
  return (
    <div className="border border-gray-600 min-h-screen border-y-0 lg:border-l-0 border-l bg-black py-2">
      <div className="flex items-center gap-6 px-3 pb-4">
        <Link href="/settings/account">
          <span>
            <FaArrowLeft />
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-white">Account information</h1>
      </div>
      <div className="px-3">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Lottie animationData={spinner} loop={true} />
          </div>
        ) : (
          user && (
            <div className="space-y-5">
              <p className="flex flex-col pb-1">
                <span className="text-base text-white">Name</span>
                <span className="text-sm text-gray-500">{user?.name}</span>
              </p>
              <p className="flex flex-col pb-1">
                <span className="text-base text-white">UserName</span>
                <span className="text-sm text-gray-500">{user?.username}</span>
              </p>
              <p className="flex flex-col pb-1">
                <span className="text-base text-white">Email</span>
                <span className="text-sm text-gray-500">{user?.email}</span>
              </p>
              <p className="flex flex-col pb-1">
                <span className="text-base text-white">Phone</span>
                <span className="text-sm text-gray-500">
                  {user?.mobileNumber}
                </span>
              </p>
              <p className="flex flex-col pb-1">
                <span className="text-base text-white">Gender</span>
                <span className="text-sm text-gray-500">{user?.gender}</span>
              </p>
              <p className="flex flex-col pb-1">
                <span className="text-base text-white">Account Status</span>
                <span className="text-sm text-gray-500">
                  {user?.status === "basic" ? "Basic" : "Premium"}
                </span>
              </p>
              <p className="flex flex-col pb-1">
                <span className="text-base text-white">Account creation</span>
                <span className="text-sm text-gray-500">
                  {user?.createdAt &&
                    new Date(user?.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
