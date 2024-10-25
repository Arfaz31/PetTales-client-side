import React from "react";
import { FaRegComment, FaShare } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
const PostAction = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-3 py-2 text-white">
        <AiOutlineLike />
        <AiOutlineDislike />
        <FaRegComment />
        <FaShare />
      </div>
    </div>
  );
};

export default PostAction;
