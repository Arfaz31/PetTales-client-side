import WorkingPage from "@/components/Shared/WorkingPage";
import React from "react";
import { IoIosNotifications } from "react-icons/io";
const Notification = () => {
  return (
    <div>
      <WorkingPage pageName="Bookmark" icon={<IoIosNotifications />} />
    </div>
  );
};

export default Notification;
