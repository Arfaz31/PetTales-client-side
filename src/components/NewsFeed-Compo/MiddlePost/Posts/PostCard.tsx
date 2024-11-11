// "use client";

import DataCard from "@/components/Shared/DataCard";
import { TPost } from "@/types";

const PostCard = ({
  post,
  userId,
  isUnlocked,
}: {
  post: TPost;
  userId: string;
  isUnlocked: boolean;
}) => {
  return (
    <div>
      <DataCard post={post} userId={userId} isUnlocked={isUnlocked} />
    </div>
  );
};

export default PostCard;
