import React, { useEffect, useState } from "react";
import { FaRegComment, FaShare } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { TPost } from "@/types";
import {
  useCheckPostDislike,
  useCheckPostLike,
  useGetTotalDisLike,
  useGetTotalLike,
  usePostDisLike,
  usePostLike,
} from "@/hooks/like.hook";
// import { useUser } from "@/context/user.provider";

const PostAction = ({ post }: { post: TPost }) => {
  const { mutate: like } = usePostLike();
  const { mutate: disLike } = usePostDisLike();

  const { data: totalLikesData } = useGetTotalLike(post._id!);
  const { data: totalDislikesData } = useGetTotalDisLike(post._id!);
  const { data: likeCheckData } = useCheckPostLike(post._id!);
  const { data: dislikeCheckData } = useCheckPostDislike(post._id!);

  const [localLikes, setLocalLikes] = useState(totalLikesData?.data ?? 0);
  const [localDislikes, setLocalDislikes] = useState(
    totalDislikesData?.data ?? 0
  );
  const [isLiked, setIsLiked] = useState(likeCheckData?.data ?? false);
  const [isDisliked, setIsDisliked] = useState(dislikeCheckData?.data ?? false);

  useEffect(() => {
    setLocalLikes(totalLikesData?.data ?? 0);
    setLocalDislikes(totalDislikesData?.data ?? 0);
    setIsLiked(likeCheckData?.data ?? false);
    setIsDisliked(dislikeCheckData?.data ?? false);
  }, [totalLikesData, totalDislikesData, likeCheckData, dislikeCheckData]);

  const handleLike = () => {
    // Toggle like state instantly
    if (isLiked) {
      setLocalLikes(localLikes - 1);
      setIsLiked(false);
    } else {
      setLocalLikes(localLikes + 1);
      setIsLiked(true);
      if (isDisliked) {
        setLocalDislikes(localDislikes - 1);
        setIsDisliked(false);
      }
    }

    // Mutate without showing server interaction in UI
    like(post._id!, {
      onError: () => {
        // Revert local state if error occurs
        setLocalLikes(isLiked ? localLikes : localLikes - 1);
        setIsLiked(isLiked);
      },
    });
  };

  const handleDislike = () => {
    // Toggle dislike state instantly
    if (isDisliked) {
      setLocalDislikes(localDislikes - 1);
      setIsDisliked(false);
    } else {
      setLocalDislikes(localDislikes + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLocalLikes(localLikes - 1);
        setIsLiked(false);
      }
    }

    // Mutate without showing server interaction in UI
    disLike(post._id!, {
      onError: () => {
        // Revert local state if error occurs
        setLocalDislikes(isDisliked ? localDislikes : localDislikes - 1);
        setIsDisliked(isDisliked);
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between px-3 py-2 text-white">
        <div className="flex items-center gap-1">
          <p>
            <AiOutlineLike className={isLiked ? "text-blue-600" : ""} />
          </p>
          <p>{localLikes}</p>
        </div>

        <div className="flex items-center gap-1">
          <AiOutlineDislike className={isDisliked ? "text-red-600" : ""} />
          <p>{localDislikes}</p>
        </div>

        <FaRegComment />
        <FaShare />
      </div>

      <hr className="border-gray-600" />

      <div className="flex items-center justify-between pt-4 pb-6">
        <button
          onClick={handleLike}
          className={`flex items-center justify-between gap-1 border-none transition-all ease-in-out duration-500 hover:scale-110 ${
            isLiked ? "text-blue-600" : "hover:text-blue-600"
          }`}
        >
          <span>
            <AiOutlineLike />
          </span>
          <span>Like</span>
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center justify-between gap-1 border-none transition-all ease-in-out duration-500 hover:scale-110 ${
            isDisliked ? "text-red-600" : "hover:text-red-600"
          }`}
        >
          <span>
            <AiOutlineDislike />
          </span>
          <span>Dislike</span>
        </button>

        <button className="flex items-center justify-between gap-1 text-white bg-transparent border-none hover:text-blue-600 transition-all ease-in-out duration-500 hover:scale-110">
          <span>
            <FaRegComment />
          </span>
          <span>Comment</span>
        </button>

        <button className="flex items-center justify-between gap-1 text-white bg-transparent border-none hover:text-blue-600 transition-all ease-in-out duration-500 hover:scale-110">
          <span>
            <FaShare />
          </span>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostAction;
