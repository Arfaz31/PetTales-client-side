"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUserGetVerified } from "@/hooks/getVerified.hook";

interface verifiedResponse {
  amount: number;
}
export default function PricingPlan() {
  const { mutate: handleVerified } = useUserGetVerified();
  const [loadingButton, setLoadingButton] = useState<
    "premium" | "premiumPlus" | null
  >(null);

  const handleUserVerifiedForPremiumPlan = (data: verifiedResponse) => {
    setLoadingButton("premium"); // Set loading for Premium Plan button
    handleVerified(data, {
      onSettled: () => setLoadingButton(null), // Reset loading state after mutation completes
    });
  };

  const handleUserVerifiedForPremiumPlusPlan = (data: verifiedResponse) => {
    setLoadingButton("premiumPlus"); // Set loading for Premium+ Plan button
    handleVerified(data, {
      onSettled: () => setLoadingButton(null), // Reset loading state after mutation completes
    });
  };

  return (
    <div className="p-2 min-h-screen py-10">
      <motion.h1
        className="md:text-3xl text-2xl font-bold text-center text-white mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Unlock Premium Pet Care Content & Get Verified
      </motion.h1>

      <motion.p
        className="text-lg text-center text-white mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to Pet Care Tips & Stories! Join our community by selecting a
        plan below to gain full access to premium pet care advice and verified
        status. Choose the best plan for you and start enjoying exclusive
        features today.
      </motion.p>

      <div className="grid gap-10 md:grid-cols-2 grid-cols-1">
        {/* Premium Plan Card */}
        <motion.div
          className="bg-gray-900 bg-opacity-15 rounded-lg p-5 border border-pink-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-pink-100">
            Premium Plan
          </h2>
          <p className="mb-2 text-white">
            The Premium Plan offers essential features to enhance your
            experience on the platform, including partial ad reduction and reply
            boosts.
          </p>
          <ul className="list-disc ml-5 mb-3 text-white">
            <li>Reduced ads in For You and Following sections</li>
            <li>Reply boost to increase engagement on your posts</li>
            <li>Monetization enabled for your pet care posts</li>
            <li>Verified checkmark badge to build trust</li>
          </ul>
          <button
            onClick={() => handleUserVerifiedForPremiumPlan({ amount: 445 })}
            className={`border-primaryColor text-default-50 bg-pink-600 rounded-md p-2 text-white ${
              loadingButton === "premium"
                ? "cursor-not-allowed min-w-28 h-10 flex items-center justify-center"
                : ""
            }`}
          >
            {loadingButton === "premium" ? (
              <div className="w-7 h-7 border-4 border-dashed  rounded-full animate-spin border-white"></div>
            ) : (
              "Pay Now - BDT 445/month"
            )}
          </button>
        </motion.div>

        {/* Premium+ Plan Card */}
        <motion.div
          className="bg-gray-900 bg-opacity-15 rounded-lg p-5 border border-pink-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-pink-100">
            Premium+ Plan
          </h2>
          <p className="mb-2 text-white">
            Unlock the full potential with our Premium+ Plan. Enjoy complete
            ad-free browsing, maximum visibility, and special privileges like
            writing exclusive articles.
          </p>
          <ul className="list-disc ml-5 mb-3 text-white">
            <li>Fully ad-free experience</li>
            <li>Largest reply boost for even higher engagement</li>
            <li>Ability to write and publish exclusive articles</li>
            <li>Exclusive access to in-depth pet care guides</li>
          </ul>
          <button
            onClick={() =>
              handleUserVerifiedForPremiumPlusPlan({ amount: 890 })
            }
            className={`border-primaryColor text-default-50 bg-pink-600 rounded-md p-2 text-white ${
              loadingButton === "premiumPlus"
                ? "cursor-not-allowed min-w-28 h-10 flex items-center justify-center"
                : ""
            }`}
          >
            {loadingButton === "premiumPlus" ? (
              <div className="w-7 h-7 border-4 border-dashed  rounded-full animate-spin border-white"></div>
            ) : (
              "Pay Now - BDT 890/month"
            )}
          </button>
        </motion.div>
      </div>

      <motion.p
        className="text-center text-gray-400 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Need help? Contact our support team for more information.
      </motion.p>
    </div>
  );
}
