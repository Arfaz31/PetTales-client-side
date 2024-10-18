"use client";

import { useEffect } from "react";
import { resetPasswordSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResetPassword } from "@/hooks/auth.hook";
import GlassLoader from "@/components/Shared/Loading";
import { useRouter, useSearchParams } from "next/navigation";

type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const resetToken = searchParams.get("token");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    const resetPasswordData = {
      ...data,
      email: email,
      token: resetToken,
    };

    if (resetPasswordData) {
      resetPassword(resetPasswordData);
    }
    reset();
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/login");
    }
  }, [isPending, isSuccess, router]);

  return (
    <>
      {isPending && <GlassLoader />}
      <div className=" min-h-screen flex items-center justify-center z-[50]">
        <div className=" bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg  overflow-hidden my-5">
          <div className="w-full md:w-[500px] xl:w-[530px] flex flex-col justify-center p-6 md:p-16">
            <h2 className="text-2xl font-bold text-center mb-2 text-white">
              Reset your password
            </h2>
            <p className="text-center  mb-8 text-white">
              Enter your new password.
            </p>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <input
                  {...register("newPassword")}
                  type="password"
                  placeholder="Password"
                  className={`w-full h-12 px-3 border ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  } focus:outline-none  focus:ring-2 focus:ring-blue-500 rounded`}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 text-white text-lg py-2 rounded hover:bg-blue-700"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
