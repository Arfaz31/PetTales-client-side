import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="min-h-[400px] border-b border-gray-600 py-5">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-3 xl:col-span-3 md:col-span-4 col-span-5 pb-3">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-600" />
          <div className="flex flex-col ">
            <Skeleton className="h-4 w-[250px] bg-gray-600 mb-2" />
            <Skeleton className="h-4 w-[200px] bg-gray-600" />
          </div>
        </div>
      </div>

      <div className="px-3">
        <Skeleton className="h-6 w-[300px] bg-gray-600 mb-2" />
        <Skeleton className="h-4 w-[100%] bg-gray-600" />
        <div className="relative mt-3">
          <Skeleton className="h-[250px] w-full bg-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
