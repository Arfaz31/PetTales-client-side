import WorkingPage from "@/components/Shared/WorkingPage";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";

const Explore = () => {
  return (
    <div>
      <WorkingPage pageName="Explore" icon={<IoSettingsOutline />} />
    </div>
  );
};

export default Explore;
