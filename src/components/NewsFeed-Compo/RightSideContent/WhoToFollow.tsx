import React from "react";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import { TUser } from "@/types";
import { useGetAllUser } from "@/hooks/user.hook";
import { Skeleton } from "@/components/ui/skeleton";
import FollowButton from "@/components/Shared/Follow/FollowButton";
import { useUser } from "@/context/user.provider";
import Link from "next/link";

const WhoToFollow = () => {
  const { data, isLoading } = useGetAllUser();
  const { user: currentUser } = useUser(); // Get current user from context
  const currentUserId = currentUser?._id ?? "";

  // Get all users from the data array or use an empty array if no data exists
  const users = data?.data || [];
  const filteredUsers =
    data?.data?.filter((user: TUser) => user._id !== currentUserId) || [];

  return (
    <>
      {isLoading ? (
        [...Array(6)].map((_, index) => (
          <div key={index} className="mb-5 ">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full bg-gray-600" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[120px] bg-gray-600" />
                  <Skeleton className="h-4 w-[120px] bg-gray-600" />
                </div>
              </div>
              <Skeleton className="h-9 w-20 rounded-3xl bg-gray-600" />
            </div>
          </div>
        ))
      ) : users.length > 0 ? (
        <div className="space-y-6">
          {filteredUsers?.slice(0, 6).map((user: TUser) => {
            const isFollowing = user.follower?.includes(currentUserId); // Check if the current user is following

            return (
              <div
                key={user._id}
                className=" flex items-center justify-between "
              >
                <div className="flex items-center gap-2">
                  <Link
                    href={`/newsfeed/userprofile/${user?._id}`}
                    className="rounded-full border-2 xl:w-10 w-9 xl:h-10 h-9 border-pink-600 cursor-pointer"
                  >
                    <Image
                      src={user?.profilePhoto || userimage}
                      alt="user profile picture"
                      width={35}
                      height={35}
                      className="rounded-full object-cover object-center w-10 h-10"
                    />
                  </Link>
                  <p className="flex flex-col ">
                    <Link href={`/newsfeed/userprofile/${user?._id}`}>
                      <span className="xl:text-base text-xs text-white font-semibold ">
                        {user?.name}
                      </span>
                    </Link>
                    <span className="xl:text-sm text-xs text-gray-500">
                      {user?.username || "@username"}
                    </span>
                  </p>
                </div>

                <FollowButton
                  userId={user?._id ?? ""}
                  isFollowing={isFollowing}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-lg font-semibold">No users found</p>
      )}
    </>
  );
};

export default WhoToFollow;
