/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LoginRightContent() {
  //   const { data: usersData } = useGetAllUsersQuery(undefined);
  //   const users = usersData?.data as TUser[];
  const users: any[] = []; // or your actual fetched data
  // Replace with actual users data when ready

  return (
    <div className="w-full md:w-[500px] xl:w-[530px] p-8 flex flex-col justify-center items-center rounded-r-lg relative overflow-hidden shadow-lg mb-10 md:mb-0">
      {/* Foreground Content */}
      <div className="relative text-center z-10">
        <h2 className="text-3xl font-bold text-default-900 flex flex-wrap items-center justify-center text-white">
          Welcome Back to<p className="text-blue-600 px-1">PetTales</p>
        </h2>
        <p className="mt-2 text-default-600 text-white">
          Join a growing community of pet lovers, share your adorable moments,
          and connect with thousands of fellow pet enthusiasts.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          {/* User Avatars */}
          <div className="flex -space-x-3">
            {users &&
              users.slice(0, 4).map((user: any) => (
                <Avatar
                  key={user?._id}
                  className="w-10 h-10 rounded-full border-2 border-white"
                >
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
          </div>
          <span className="text-default-500 text-sm text-white">
            Join {users?.length || "10"}+ users
          </span>
        </div>
      </div>
    </div>
  );
}
