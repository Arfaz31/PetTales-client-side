"use server";
import {
  getMyAllPost,
  getMyPremiumPosCount,
  getUnlockingUsersAndEarnings,
} from "@/services/PostService";
import { getme } from "@/services/UserService";
import { BadgeDollarSign } from "lucide-react";
import React from "react";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import MyPostsManagement from "./_component/myPostsManagement";
const UserDashboardHome = async () => {
  const { data: user } = await getme();
  const userId = user?._id;
  const { data: myAllPostData } = await getMyAllPost(userId);
  const { data: premiumPostCount } = await getMyPremiumPosCount();
  const { data: UnlockingUsersAndEarningsData } =
    await getUnlockingUsersAndEarnings();

  const cardData = [
    {
      icon: (
        <BsFillPostcardHeartFill className="xl:w-12 xl:h-12 w-10 h-10 text-white" />
      ),
      value: myAllPostData?.posts?.length || "0",
      label: "My Total Posts",
    },
    {
      icon: (
        <MdOutlineWorkspacePremium className="xl:w-12 xl:h-12 w-10 h-10 text-white" />
      ),
      value: premiumPostCount || "0",
      label: "Total Premium Posts",
    },
    {
      icon: (
        <BadgeDollarSign className="xl:w-12 xl:h-12 w-10 h-10 text-white" />
      ),
      value:
        `${UnlockingUsersAndEarningsData?.totalEarnings?.toFixed(2)} Tk` ||
        "0.00 Tk",
      label: "Total Earnings",
    },

    {
      icon: <MdVerified className="xl:w-12 xl:h-12 w-10 h-10 text-white" />,
      value: `Status: ${user?.status}`,
      label: `${user?.status === "premium" ? "Verified" : "Get Verified"}`,
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
        <MyPostsManagement />
      </div>
    </div>
  );
};

export default UserDashboardHome;
