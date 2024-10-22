"use client";

import React from "react";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading.json";
const LoadingPage = () => {
  return (
    <div className="h-screen bg-black relative inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-[200px] md:w-[300px] h-[300px] bg-pink-400 opacity-70 blur-[100px] absolute top-28 left-20" />
        <div className="w-[200px] md:w-[300px] h-[300px] bg-blue-400 opacity-70 blur-[100px] absolute bottom-10 right-20 " />
      </div>
      <div className="z-50 relative">
        <Lottie animationData={spinner} loop={true} />
      </div>
    </div>
  );
};

export default LoadingPage;
