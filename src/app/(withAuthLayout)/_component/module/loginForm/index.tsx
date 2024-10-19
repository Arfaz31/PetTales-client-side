"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import { loginSchema } from "@/schemas/auth.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import LoginRightContent from "./loginRightContent";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { useUserLogin } from "@/hooks/auth.hook";
import GlassLoader from "@/components/Shared/Loading";

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    if (data) {
      handleUserLogin(data);
      userLoading(true);
    }
    reset();
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect); //redirect to that private route that was clicked before!
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <>
      {isPending && <GlassLoader />}
      <div className="w-full md:min-h-screen flex items-center justify-center max-w-6xl mx-auto">
        <div className=" flex flex-col-reverse md:flex-row bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg w-full overflow-hidden my-5">
          {/* Left side - Form Section */}
          <div className="w-full md:w-[500px] xl:w-[530px] flex flex-col justify-center p-6 md:p-16">
            <h2 className="text-2xl font-bold text-center mb-2 text-white">
              Log in to your account
            </h2>
            <p className="text-center  mb-8 text-white">
              Welcome back! Please login to continue.
            </p>

            {/* Login Form */}

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

              {/* Password Input */}
              <div className="flex flex-col gap-1 relative">
                <input
                  {...register("password")}
                  type={isVisible ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full h-12 px-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`}
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute top-3 right-3 text-gray-400 focus:outline-none"
                >
                  {isVisible ? (
                    <IoEyeOffOutline className="text-xl" />
                  ) : (
                    <IoEyeOutline className="text-xl" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end text-xs">
                <Link
                  href="/forgot-password"
                  className="text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 text-white text-lg py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>
            </form>

            {/* Create Account Link */}
            <p className="text-center text-gray-500 text-xs mt-4">
              New here?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          {/* Right side - Info Section */}
          <LoginRightContent />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
