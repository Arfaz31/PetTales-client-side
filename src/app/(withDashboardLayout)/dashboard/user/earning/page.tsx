"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";
import Image from "next/image";
import { TUnlockPost } from "@/types";
import { useGetUnlockingUsersAndEarnings } from "@/hooks/post.hook";
const UsersWhoUnlockMyPost = () => {
  const { data: UnlockingUsersAndEarningsData, isLoading } =
    useGetUnlockingUsersAndEarnings();

  return (
    <div className="md:mx-10 my-10 mx-5 overflow-x-scroll">
      <div className="xl:w-full w-[1050px] bg-white shadow-md   pb-12">
        <h2 className="text-2xl font-bold py-8 text-center">
          Users who unlock my premium posts via payment
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-base">User PP</TableHead>
              <TableHead className="font-semibold text-base">
                User Name
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
              UnlockingUsersAndEarningsData?.data.unlockRecords?.map(
                (user: TUnlockPost) => (
                  <TableRow key={user?._id}>
                    <TableCell>
                      <Image
                        src={user?.userId?.profilePhoto ?? ""}
                        width={80}
                        height={80}
                        className="w-12 h-12 rounded-full"
                        alt="user profile photo"
                      />
                    </TableCell>
                    <TableCell>{user?.userId?.name}</TableCell>
                    <TableCell>
                      <Image
                        src={user?.postId?.images?.[0] ?? ""}
                        width={80}
                        height={80}
                        className="w-12 h-12 rounded-xl"
                        alt="unlock post image"
                      />
                    </TableCell>
                    <TableCell>{user?.postId?.title}</TableCell>
                    <TableCell className="text-center">
                      {user?.postId?.category}
                    </TableCell>

                    <TableCell>
                      {user?.createdAt &&
                        new Date(user?.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{user?.transactionId}</TableCell>
                    <TableCell className="text-center">
                      {user?.amount || "0"} tk
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
          <TableFooter className="bg-slate-100">
            <TableRow>
              <TableCell colSpan={7} className="text-base font-bold">
                Total
              </TableCell>
              <TableCell className="text-center text-base font-bold">
                {UnlockingUsersAndEarningsData?.data?.totalEarnings} tk
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default UsersWhoUnlockMyPost;
