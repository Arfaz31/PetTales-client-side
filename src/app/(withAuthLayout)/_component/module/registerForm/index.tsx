"use client";

import React from "react";
import { z } from "zod";
import { registerSchema } from "@/schemas/auth.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import RegisterRightContent from "./registerRightContent";

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      if (data) {
        console.log(data);
        toast.success("Register is successful");
      }
    } catch (err) {
      toast.error("Failed to Register");
      console.log(err);
    } finally {
      reset();
    }
  };

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center max-w-7xl">
      <div className="flex flex-col-reverse md:flex-row bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg w-full overflow-hidden my-5">
        {/* Left side - Form Section */}
        <div className="w-full md:w-[500px] xl:w-[530px] flex flex-col justify-center p-6 md:p-16">
          <h2 className="text-2xl font-bold text-center mb-2 text-white">
            Create your account
          </h2>
          <p className="text-center  mb-8 text-white">
            Start your 30 days free trial
          </p>

          {/* Register Form */}

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className={`w-full h-12 px-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className={`w-full h-12 px-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
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
                  {errors.password?.message}
                </p>
              )}
            </div>

            {/* Mobile number Input */}
            <div className="flex flex-col gap-1">
              <input
                {...register("mobileNumber")}
                type="text"
                placeholder="Phone Number"
                className={`w-full h-12 px-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.mobileNumber?.message}
                </p>
              )}
            </div>

            {/* Gender Select */}
            <div className="flex flex-col gap-1">
              <select
                {...register("gender")}
                className={`w-full h-12 px-3 border ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender?.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-pink-600 text-white text-lg py-2 rounded hover:bg-blue-700"
            >
              SignUP
            </button>
          </form>

          {/* Create Account Link */}
          <p className="text-center text-gray-300 text-xs mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-pink-500 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right side - Info Section */}
        <RegisterRightContent />
      </div>
    </div>
  );
};

export default RegisterPage;
