"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";
import Image from "next/image";
import { TUnlockPost } from "@/types";
import { useGetMyUnlockPosts } from "@/hooks/post.hook";
const MyUnlockPosts = () => {
  const { data: myUnlockPosts, isLoading } = useGetMyUnlockPosts();

  return (
    <div className="md:mx-10 my-10 mx-5 overflow-x-scroll">
      <div className="xl:w-full w-[1050px] bg-white shadow-md pb-12">
        <h2 className="text-2xl font-bold pt-8 text-center">
          My Payment History
        </h2>
        <p className="text-center text-gray-500 pt-2 pb-8">
          {" "}
          Premium posts I have unlocked
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-base">
                Post-Owner PP
              </TableHead>
              <TableHead className="font-semibold text-base">
                Post-Owner Name
              </TableHead>
              <TableHead className="font-semibold text-base">
                Post Image
              </TableHead>
              <TableHead className="font-semibold text-base">Title</TableHead>
              <TableHead className="font-semibold text-base">
                Category
              </TableHead>
              <TableHead className="font-semibold text-base">
                Payment Date
              </TableHead>
              <TableHead className="font-semibold text-base">
                Transaction ID
              </TableHead>
              <TableHead className="font-semibold text-base">
                paymentStatus
              </TableHead>
              <TableHead className="font-semibold text-base">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-20">
                  <div className="  flex items-center justify-center w-full h-14 ">
                    <Lottie animationData={spinner} loop={true} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              myUnlockPosts?.data?.map((UnlockPost: TUnlockPost) => (
                <TableRow key={UnlockPost?._id}>
                  <TableCell>
                    <Image
                      src={UnlockPost?.postId?.user?.profilePhoto ?? ""}
                      width={80}
                      height={80}
                      className="w-12 h-12 rounded-full"
                      alt="user profile photo"
                    />
                  </TableCell>
                  <TableCell>{UnlockPost?.postId?.user?.name}</TableCell>
                  <TableCell>
                    <Image
                      src={UnlockPost?.postId?.images?.[0] ?? ""}
                      width={80}
                      height={80}
                      className="w-12 h-12 rounded-xl"
                      alt="unlock post image"
                    />
                  </TableCell>
                  <TableCell>{UnlockPost?.postId?.title}</TableCell>
                  <TableCell className="text-center">
                    {UnlockPost?.postId?.category}
                  </TableCell>

                  <TableCell>
                    {UnlockPost?.createdAt &&
                      new Date(UnlockPost?.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{UnlockPost?.transactionId}</TableCell>
                  <TableCell>{UnlockPost?.paymentStatus}</TableCell>

                  <TableCell className="text-center">
                    {UnlockPost?.amount || "0"} tk
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyUnlockPosts;
