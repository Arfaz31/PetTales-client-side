import React from "react";
import { Skeleton } from "../ui/skeleton";

const ChatMembersSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center bg-[#2c2c2c] rounded-lg gap-3 px-4 py-2"
          >
            <Skeleton className="h-10 w-10 rounded-full bg-gray-600" />
            <div className="flex flex-col flex-grow">
              <Skeleton className="h-4 w-[150px] bg-gray-600 mb-2" />
              <Skeleton className="h-4 w-[110px] bg-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMembersSkeleton;
