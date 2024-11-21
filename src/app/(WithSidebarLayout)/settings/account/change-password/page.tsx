"use client";

import FXForm from "@/components/Shared/Form/FXForm";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/schemas/auth.schema";
import FXInput from "@/components/Shared/Form/FXInput";
import { useUserChangePassword } from "@/hooks/auth.hook";
import GlassLoader from "@/components/Shared/Loading";
import { toast } from "sonner";
interface FormValues {
  oldPassword: string;
  newPassword: string;
}
const ChangePassword = () => {
  const { reset } = useForm();
  const { mutate: handleChangePassword, isPending } = useUserChangePassword();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data) {
      console.log(data);
      handleChangePassword(data, {
        onSuccess: (userData) => {
          if (userData.success) {
            toast.success(userData.message || "Password Changed successfully!");
          } else {
            toast.error(userData.message || "Failed to change password.");
          }
          reset();
        },
      });
    }
  };

  return (
    <>
      {isPending && <GlassLoader />}
      <div className="border border-gray-600 min-h-screen border-y-0 lg:border-l-0 border-l bg-black py-2">
        <div className="flex items-center gap-6 px-3 pb-4">
          <Link href="/settings/account">
            <span>
              <FaArrowLeft />
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            Change your password
          </h1>
        </div>
        <div className="px-3">
          <FXForm
            resolver={zodResolver(changePasswordSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput
                label="Old Password"
                name="oldPassword"
                placeholder="Old Password"
                type="password"
                className="min-w-fit "
              />
              <Link href="/forgot-password" className="text-pink-600 text-xs ">
                {" "}
                Forgot Password?
              </Link>
            </div>
            <div className="py-3 mb-4">
              <FXInput
                label="New Password"
                name="newPassword"
                placeholder="New Password"
                type="password"
                className="min-w-fit "
              />
            </div>

            <button
              type="submit"
              className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 text-base font-semibold text-white text-center px-8 py-2 "
            >
              Submit
            </button>
          </FXForm>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
