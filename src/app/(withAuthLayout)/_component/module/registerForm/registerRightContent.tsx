/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

export default function RegisterRightContent() {
  // Static users array for now
  const users: any[] = [
    {
      _id: "641b9b8f42e5f1a1f3341a1a",
      name: "John Doe",
      profilePhoto: "", // No image
    },
    {
      _id: "641b9b8f42e5f1a1f3341a1b",
      name: "Jane Smith",
      profilePhoto: "", // No image
    },
    {
      _id: "641b9b8f42e5f1a1f3341a1c",
      name: "Alice Johnson",
      profilePhoto: "", // Example image
    },
    {
      _id: "641b9b8f42e5f1a1f3341a1d",
      name: "Bob Williams",
      profilePhoto: "", // No image
    },
    {
      _id: "641b9b8f42e5f1a1f3341a1e",
      name: "Charlie Brown",
      profilePhoto: "", // Example image
    },
  ];

  return (
    <div className="w-full md:w-[500px] xl:w-[530px] p-8 flex flex-col justify-center items-center rounded-r-lg relative overflow-hidden shadow-lg mb-10 md:mb-0">
      <div className="relative text-center z-10">
        <h2 className="text-3xl font-bold text-default-900 flex flex-wrap items-center justify-center text-white">
          Join Our<p className="text-pink-600 px-1">PetTales</p> Community
        </h2>
        <p className="mt-2 text-default-600 text-white">
          Become part of a vibrant community of pet enthusiasts, where you can
          share heartwarming stories, showcase your furry friends, and connect
          with others who love pets just as much as you do.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          {/* User Avatars */}
          <div className="flex -space-x-3">
            {users &&
              users.slice(0, 4).map((user: any) => (
                <div
                  key={user._id}
                  className="relative rounded-full border-2 border-pink-600 cursor-pointer flex items-center justify-center bg-gray-200 text-pink-600 font-bold"
                  style={{ width: 35, height: 35 }}
                >
                  {user?.profilePhoto ? (
                    <Image
                      src={user.profilePhoto}
                      alt={user.name}
                      width={35}
                      height={35}
                      className="rounded-full"
                    />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
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
