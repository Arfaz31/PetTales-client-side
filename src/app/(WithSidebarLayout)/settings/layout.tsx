import LeftSidebar from "@/components/NewsFeed-Compo/LeftSidebar/LeftSidebar";
import Container from "@/components/Shared/Container";
import { ReactNode } from "react";
import SettingsMiddleTab from "../_component/module/settingsMiddleTab";

type TProps = {
  children: ReactNode;
};

const SettingsLayout = ({ children }: TProps) => {
  return (
    <div className="bg-[#000000] text-white min-h-screen ">
      <Container className="grid grid-cols-12">
        {/* Left Sidebar - Sticky */}
        <div className="col-span-3 h-screen sticky top-0 overflow-y-auto">
          <LeftSidebar />
        </div>

        {/* Middle tab - Sticky */}
        <div className="col-span-4 h-screen sticky top-0 overflow-hidden">
          <SettingsMiddleTab />
        </div>

        {/* RightSide Content - Scrollable */}
        <div className="col-span-5 h-screen overflow-y-auto">{children}</div>
      </Container>
    </div>
  );
};

export default SettingsLayout;
