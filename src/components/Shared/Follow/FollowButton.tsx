import React, { useState } from "react";
import { useUserFollow, useUserUnFollow } from "@/hooks/follow.hook";

const FollowButton = ({
  userId,
  isFollowing: initialIsFollowing,
}: {
  userId: string;
  isFollowing: boolean;
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const { mutate: follow, isPending: isFollowPending } = useUserFollow();
  const { mutate: unfollow, isPending: isUnFollowPending } = useUserUnFollow();

  const followHandler = () => {
    follow(userId, {
      onSuccess: () => setIsFollowing(true),
    });
  };

  const unFollowHandler = () => {
    unfollow(userId, {
      onSuccess: () => setIsFollowing(false),
    });
  };

  return (
    <div>
      {isFollowing ? (
        <button
          className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 xl:text-base text-xs font-bold text-white text-center xl:px-4 px-2 py-2"
          onClick={unFollowHandler}
          disabled={isUnFollowPending}
        >
          {isUnFollowPending ? "Unfollowing..." : "Unfollow"}
        </button>
      ) : (
        <button
          className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 xl:text-base text-xs font-bold text-white text-center xl:px-4 px-2 py-2"
          onClick={followHandler}
          disabled={isFollowPending}
        >
          {isFollowPending ? "Following..." : "Follow"}
        </button>
      )}
    </div>
  );
};

export default FollowButton;
