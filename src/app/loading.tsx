"use client";

import React from "react";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading.json";
const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center">
      <Lottie animationData={spinner} loop={true} />
    </div>
  );
};

export default LoadingPage;
