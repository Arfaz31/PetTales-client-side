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
import { TVerifiedUser } from "@/types";
import { useGetAllVerifiedUsers } from "@/hooks/getVerified.hook";

const WebsitePaymentHistory = () => {
  const { data: verifiedUsers, isLoading } = useGetAllVerifiedUsers();
  const tableHeaders = [
    "User PP",
    "User Name",
    "UserName",
    "Gender",
    "Email",
    "Phone",
    "Transaction ID",
    "Payment Status",
    "Amount",
    "Date",
  ];
  return (
    <div className="md:mx-10 mt-10 mx-5 overflow-x-scroll">
      <div className="xl:w-full w-[1050px] bg-white shadow-md  pt-10">
        <h2 className="text-2xl font-bold  text-center">
          Website Payment History
        </h2>
        <p className="text-base text-center pt-3 pb-9 text-gray-600">
          All the verified users payment history
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead
                  key={index}
                  className="font-semibold text-base min-w-[140px]"
                >
                  {header}
                </TableHead>
              ))}
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
              verifiedUsers?.data?.map((user: TVerifiedUser) => (
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
                  <TableCell>{user?.userId?.username}</TableCell>
                  <TableCell>{user?.userId?.gender}</TableCell>
                  <TableCell>{user?.userId?.email}</TableCell>
                  <TableCell>{user?.userId?.mobileNumber}</TableCell>
                  <TableCell>{user?.transactionId}</TableCell>
                  <TableCell>{user?.paymentStatus}</TableCell>
                  <TableCell>{user?.amount || "0"} tk</TableCell>
                  <TableCell>
                    {user?.createdAt &&
                      new Date(user?.createdAt).toLocaleString()}
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

export default WebsitePaymentHistory;
