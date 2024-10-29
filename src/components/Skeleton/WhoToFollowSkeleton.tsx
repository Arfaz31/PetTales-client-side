import React from "react";
import { Skeleton } from "../ui/skeleton";

const WhoToFollowSkeleton = () => {
  return (
    <div>
      {[...Array(6)].map((_, index) => (
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
      ))}
    </div>
  );
};

export default WhoToFollowSkeleton;
