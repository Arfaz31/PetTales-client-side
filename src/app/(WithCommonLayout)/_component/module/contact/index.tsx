"use client";

import Container from "@/components/Shared/Container";
import GlassLoader from "@/components/Shared/Loading";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type QusInput = {
  name: string;
  email: string;
  message: string;
};
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<QusInput>();
  const onSubmit: SubmitHandler<QusInput> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);

      if (data) {
        setTimeout(() => {
          setIsSubmitting(false);
          toast.success("Your message is submitted successfully");
        }, 2000);
      }
    } catch (err) {
      toast.error("Failed to send message");
      console.log(err);
    } finally {
      reset();
    }
  };
  return (
    <Container className="min-h-screen flex items-center justify-center">
      {isSubmitting && <GlassLoader />}
      <div className="bg-black bg-opacity-15 max-w-6xl w-full flex flex-col lg:flex-row justify-center items-center rounded-md gap-10 p-8 lg:p-14">
        <div className="rounded-lg w-full ">
          <h2 className="text-3xl font-semibold text-pink-500 mb-8 text-center">
            Contact Us
          </h2>
          <p className="text-lg text-center text-gray-300 mb-8">
            Have any questions or feedback? Fill out the form below, and we will
            get back to you as soon as possible. We are always excited to hear
            from fellow travelers!
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-6 py-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="border-2 border-gray-500 focus:border-gray-300 text-gray-400 bg-transparent focus:outline-none w-full h-12 px-2"
              />
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", { required: true })}
                className="border-2 border-gray-500 focus:border-gray-300 text-gray-400 bg-transparent focus:outline-none w-full h-12 px-2"
              />
            </div>

            <textarea
              placeholder="Your Message"
              {...register("message", { required: true })}
              className="w-full h-32 pl-4 pt-2 bg-transparent border-2 border-gray-500 focus:border-gray-300 text-gray-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex text-lg items-center justify-center bg-pink-600 text-white w-full lg:w-[180px] h-14 p-3 mt-4 relative group overflow-hidden rounded-md"
          >
            <span className="relative z-10">Submit Now</span>
            <span className="absolute inset-0 bg-pink-500 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Contact;
