"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Documentations() {
  return (
    <div className="p-2 min-h-screen py-10">
      <motion.h1
        className="md:text-3xl text-2xl font-bold text-center text-white mb-2" // Changed to text-white
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Pet Care Tips & Stories
      </motion.h1>

      <motion.p
        className="text-lg text-center text-white mb-8 max-w-2xl mx-auto" // Changed to text-white
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to Pet Care Tips & Stories! This platform is designed to provide
        valuable advice and heartwarming tales for pet owners. Here’s how you
        can engage with our community!
      </motion.p>

      <div className="grid gap-10 md:grid-cols-2 grid-cols-1">
        <motion.div
          className="bg-gray-900 bg-opacity-15 rounded-lg p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-pink-100">
            Engaging with the Community
          </h2>
          <p className="mb-2 text-white">
            {" "}
            Connect with fellow pet lovers by participating in discussions and
            sharing your experiences.
          </p>
          <ul className="list-disc ml-5 mb-3 text-white">
            {" "}
            <li>
              <strong>Follow:</strong> Other users to keep up with their posts.
            </li>
            <li>
              <strong>Comment:</strong> Share your insights on various stories
              and tips.
            </li>
            <li>
              <strong>Upvote:</strong> Highlight content that resonates with
              you.
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-gray-900 bg-opacity-15 rounded-lg p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-pink-100">
            Creating and Sharing Content
          </h2>
          <p className="mb-2 text-white">
            {" "}
            Use our rich text editor to craft engaging pet care tips and
            heartwarming stories:
          </p>
          <ul className="list-disc ml-5 mb-3 text-white">
            {" "}
            <li>
              Click the <strong>Create Post</strong> button to start.
            </li>
            <li>Add a captivating title and detailed content.</li>
            <li>Attach images to enhance your storytelling.</li>
            <li>Organize your posts into categories for easy navigation.</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="bg-gray-900 bg-opacity-15 rounded-lg p-5 mt-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-pink-100">
          Frequently Asked Questions
        </h2>
        <div className="mb-3">
          <h3 className="font-semibold text-white"> User Authentication</h3>
          <p className="text-white">
            {" "}
            Sign up with your email and password. Our JWT authentication ensures
            a secure login process.
          </p>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold text-white"> Profile Management</h3>
          <p className="text-white">
            {" "}
            Update your profile information and verify your identity for premium
            content access.
          </p>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold text-white"> Engagement Features</h3>
          <p className="text-white">
            {" "}
            Upvote or downvote posts to help others find valuable content.
          </p>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold text-white"> Payment Integration</h3>
          <p className="text-white">
            {" "}
            Gain access to premium content through secure payment methods like
            Aamarpay or Stripe.
          </p>
        </div>
      </motion.div>

      <motion.p
        className="text-center text-gray-400 mt-10" // Changed to text-white
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        For more assistance, feel free to reach out to us. Happy pet parenting!
      </motion.p>
    </div>
  );
}
