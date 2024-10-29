import MiddlePost from "@/components/NewsFeed-Compo/MiddlePost/MiddlePost";
import PostCardSkeleton from "@/components/Skeleton/PostSkeleton";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<PostCardSkeleton />}>
        <MiddlePost />
      </Suspense>
    </div>
  );
};

export default page;
