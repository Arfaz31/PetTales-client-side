import WorkingPage from "@/components/Shared/WorkingPage";
import React from "react";
import { FaFacebookMessenger } from "react-icons/fa";

const Message = () => {
  return (
    <div>
      <WorkingPage pageName="Message" icon={<FaFacebookMessenger />} />
    </div>
  );
};

export default Message;
