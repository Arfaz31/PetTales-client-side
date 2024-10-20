"use client";

import React from "react";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading.json";
const LoadingPage = () => {
  return (
    <div className="h-screen bg-black/70 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Lottie animationData={spinner} loop={true} />
    </div>
  );
};

export default LoadingPage;
