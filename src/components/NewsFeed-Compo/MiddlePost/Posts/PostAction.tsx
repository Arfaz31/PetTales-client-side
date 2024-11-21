import React, { useState } from "react";
import { FaRegComment, FaShare } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { TPost } from "@/types";
import {
  usePostDisLike,
  usePostLike,
  usePostUnlike,
  usePostUnDislike,
} from "@/hooks/like.hook";
import { useUser } from "@/context/user.provider";
import Link from "next/link";

interface PostActionProps {
  post: TPost;
}

const PostAction = ({ post }: PostActionProps) => {
  const { _id = "", like = [], disLike = [] } = post;
  const { user } = useUser();
  const userId = user?._id ?? "";

  // Check if the current user has liked or disliked the post
  //checks if any user in the like or dislike array has the same _id as the current user's userId.
  const likeExists = like.some((user) => user._id === userId);
  const dislikeExists = disLike.some((user) => user._id === userId);

  // Local state for like and dislike
  const [localLike, setLocalLike] = useState(likeExists);
  const [localDislike, setLocalDislike] = useState(dislikeExists);
  const [localLikeCount, setLocalLikeCount] = useState(like.length);
  const [localDislikeCount, setLocalDislikeCount] = useState(disLike.length);

  const { mutate: likeFn } = usePostLike();
  const { mutate: unLikeFn } = usePostUnlike();
  const { mutate: disLikeFn } = usePostDisLike();
  const { mutate: unDislikeFn } = usePostUnDislike();

  const handleLike = () => {
    if (localLike) {
      //  Remove like
      setLocalLike(false);
      setLocalLikeCount(localLikeCount - 1);

      // Call backend to unlike the post
      unLikeFn(_id, {
        onError: () => {
          setLocalLike(true); // Revert on error
          setLocalLikeCount(localLikeCount); // Revert like count
        },
      });
    } else {
      //  Add like
      setLocalLike(true);
      setLocalLikeCount(localLikeCount + 1);

      // Call backend to like the post
      likeFn(_id, {
        onSuccess: () => {
          if (localDislike) {
            // Remove dislike if it exists
            setLocalDislike(false);
            setLocalDislikeCount(localDislikeCount - 1);
            unDislikeFn(_id); // Remove the dislike on server
          }
        },
        onError: () => {
          setLocalLike(false); // Revert on error
          setLocalLikeCount(localLikeCount); // Revert like count
        },
      });
    }
  };

  const handleDislike = () => {
    if (localDislike) {
      //  Remove dislike
      setLocalDislike(false);
      setLocalDislikeCount(localDislikeCount - 1);

      // Call backend to undislike the post
      unDislikeFn(_id, {
        onError: () => {
          setLocalDislike(true); // Revert on error
          setLocalDislikeCount(localDislikeCount); // Revert dislike count
        },
      });
    } else {
      //  Add dislike
      setLocalDislike(true);
      setLocalDislikeCount(localDislikeCount + 1);

      // Call backend to dislike the post
      disLikeFn(_id, {
        onSuccess: () => {
          if (localLike) {
            // Remove like if it exists
            setLocalLike(false);
            setLocalLikeCount(localLikeCount - 1);
            unLikeFn(_id); // Remove the like on server
          }
        },
        onError: () => {
          setLocalDislike(false); // Revert on error
          setLocalDislikeCount(localDislikeCount); // Revert dislike count
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-3 py-2 text-white">
        <div className="flex items-center gap-1">
          <AiOutlineLike className={localLike ? "text-blue-600" : ""} />
          <p>{localLikeCount}</p>
        </div>
        <div className="flex items-center gap-1">
          <AiOutlineDislike className={localDislike ? "text-red-600" : ""} />
          <p>{localDislikeCount}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaRegComment />
          <p>{post.comments.length}</p>
        </div>
        <FaShare />
      </div>
      <hr className="border-gray-600" />

      <div className="flex items-center justify-between pt-4 pb-6 sm:text-base text-sm">
        <button
          onClick={handleLike}
          className={`flex items-center justify-between gap-1 border-none transition-all ease-in-out duration-500 hover:scale-110 ${
            localLike ? "text-blue-600" : "text-white hover:text-blue-600"
          }`}
        >
          <AiOutlineLike />
          Like
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center justify-between gap-1 border-none transition-all ease-in-out duration-500 hover:scale-110 ${
            localDislike ? "text-red-600" : "text-white hover:text-red-600"
          }`}
        >
          <AiOutlineDislike />
          Dislike
        </button>

        <Link href={`/newsfeed/posts/${post?._id}`}>
          <button className="flex items-center justify-between gap-1 text-white bg-transparent border-none hover:text-blue-600 transition-all ease-in-out duration-500 hover:scale-110">
            <FaRegComment />
            <span>Comment</span>
          </button>
        </Link>

        <button className="flex items-center justify-between gap-1 text-white bg-transparent border-none hover:text-blue-600 transition-all ease-in-out duration-500 hover:scale-110">
          <FaShare />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostAction;
