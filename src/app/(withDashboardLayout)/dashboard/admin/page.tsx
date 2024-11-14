"use server";

import {
  getTotalIncomeOfWebsite,
  getTotalVerifiedUsers,
} from "@/services/GetVerified";
import { getAllPosts } from "@/services/PostService";
import { getAllUser } from "@/services/UserService";
import { BadgeDollarSign } from "lucide-react";
import React from "react";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import UsersManagement from "./_component/manageUsers";

const AdminDashboardHome = async () => {
  const { data: AllUsersData } = await getAllUser();
  const { posts } = await getAllPosts();
  const { data: verifiedUsersData } = await getTotalVerifiedUsers();
  const { data: totalWebsiteEarnings } = await getTotalIncomeOfWebsite();

  // const postsLength = AllPostData?.pages?.[0]?.posts?.length || 0;
  const cardData = [
    {
      icon: <FaUsers className="xl:w-12 xl:h-12 w-10 h-10 text-white" />,
      value: AllUsersData?.length || "0",
      label: "Total Users",
    },
    {
      icon: (
        <BsFillPostcardHeartFill className="xl:w-12 xl:h-12 w-10 h-10 text-white" />
      ),
      value: posts.length,
      label: "Total Posts",
    },
    {
      icon: <MdVerified className="xl:w-12 xl:h-12 w-10 h-10 text-white" />,
      value: verifiedUsersData.length || "0",
      label: "Verified Users",
    },
    {
      icon: (
        <BadgeDollarSign className="xl:w-12 xl:h-12 w-10 h-10 text-white" />
      ),
      value: `${totalWebsiteEarnings?.toFixed(2)} Tk` || "0.00 Tk",
      label: "Total Earnings",
    },
  ];

  return (
    <div className="my-12 mx-8">
      <div className="flex md:flex-row flex-col gap-8 items-center justify-center">
        {cardData?.map((card, index) => (
          <div
            key={index}
            className="xl:w-[280px] xl:h-[200px] md:w-[320px] w-[300px] h-[220px] py-5 bg-white shadow-md border-t-2 border-[#8baaf3] flex flex-col items-center justify-center"
          >
            <div className="bg-[#2b2b5e] rounded-full p-3">{card?.icon}</div>
            <p className="xl:text-2xl text-xl font-bold pt-4 pb-2">
              {card?.value}
            </p>
            <p className="text-base text-gray-500">{card?.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <UsersManagement />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
