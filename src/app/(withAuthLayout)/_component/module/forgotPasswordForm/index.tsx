"use client";

import { forgotPasswordSchema } from "@/schemas/auth.schema";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useForgotPassword } from "@/hooks/auth.hook";
import GlassLoader from "@/components/Shared/Loading";

type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;
const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    if (data) {
      // console.log(data);
      forgotPassword(data);
    }
    reset();
  };

  return (
    <>
      {isPending && <GlassLoader />}
      <div className=" min-h-screen flex items-center justify-center z-[50]">
        <div className=" bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg  overflow-hidden my-5">
          <div className="w-full md:w-[500px] xl:w-[530px] flex flex-col justify-center p-6 md:p-16">
            <h2 className="text-2xl font-bold text-center mb-2 text-white">
              Forgot your password?
            </h2>
            <p className="text-center  mb-8 text-white">
              Enter your email address and we will send you a password reset
              link.
            </p>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className={`w-full h-12 px-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none  focus:ring-2 focus:ring-blue-500 rounded`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 text-white text-lg py-2 rounded hover:bg-blue-700"
              >
                Send Reset Link
              </button>
            </form>

            <p className="text-center text-gray-500 text-xs mt-4">
              Remembered your password?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
