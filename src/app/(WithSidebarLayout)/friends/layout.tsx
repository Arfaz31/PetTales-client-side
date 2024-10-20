import LeftSidebar from "@/components/NewsFeed-Compo/LeftSidebar/LeftSidebar";
import Container from "@/components/Shared/Container";
import { ReactNode } from "react";
import FriendsRightSideContent from "../_component/module/friendsRightSideContent";

type TProps = {
  children: ReactNode;
};

const FriendsLayout = ({ children }: TProps) => {
  return (
    <div className="bg-[#000000] text-white min-h-screen ">
      <Container className="grid grid-cols-12">
        {/* Left Sidebar - Sticky */}
        <div className="col-span-3 h-screen sticky top-0 overflow-y-auto">
          <LeftSidebar />
        </div>

        {/* Middle Content - Scrollable */}
        <div className="col-span-6 h-screen overflow-y-auto">{children}</div>

        {/* Right Sidebar - Sticky */}
        <div className="col-span-3 h-screen sticky top-0 overflow-hidden">
          <FriendsRightSideContent />
        </div>
      </Container>
    </div>
  );
};

export default FriendsLayout;
