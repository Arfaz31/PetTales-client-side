"use Server";
import UserProfileCard from "@/components/UserProfile/UserProfileCard";
import { getMyAllPost } from "@/services/PostService";
import { getSingleUser } from "@/services/UserService";

import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

interface UserId {
  params: {
    userId: string;
  };
}

const UserProfile = async ({ params }: UserId) => {
  console.log("Fetching data for user ID:", params.userId);
  const { data: user } = await getSingleUser(params.userId);

  const { data: myPostData } = await getMyAllPost(params.userId);

  return (
    <div className=" md:border-x border-gray-600 min-h-screen  bg-black py-2">
      <div className=" sticky top-0 z-50 bg-black w-full md:block hidden">
        <div className="flex items-center gap-10 px-4  pt-1 pb-2">
          <div>
            <span>
              <FaArrowLeftLong className="text-white w-6 h-6" />
            </span>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <h2 className="  text-xl font-bold text-white ">{user?.name}</h2>
            <p className="text-gray-500 text-xs">{myPostData.length} Posts</p>
          </div>
        </div>
        <hr className="border-gray-600" />
      </div>
      <div>
        <UserProfileCard user={user} myPostData={myPostData} />
      </div>
    </div>
  );
};

export default UserProfile;
