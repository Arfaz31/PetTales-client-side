import WorkingPage from "@/components/Shared/WorkingPage";
import React from "react";
import { FaBookmark } from "react-icons/fa";

const Bookmark = () => {
  return (
    <div>
      <WorkingPage pageName="Bookmark" icon={<FaBookmark />} />
    </div>
  );
};

export default Bookmark;
