import LeftSidebar from "@/components/NewsFeed-Compo/LeftSidebar/LeftSidebar";
import Container from "@/components/Shared/Container";
import { ReactNode } from "react";
import FriendsRightSideContent from "../_component/module/friendsRightSideContent";
import UpperNav from "@/components/NewsFeed-Compo/SmDeviceNav/UpperNav";
import BottomNav from "@/components/NewsFeed-Compo/SmDeviceNav/BottomNav";

type TProps = {
  children: ReactNode;
};

const FriendsLayout = ({ children }: TProps) => {
  return (
    <div className="bg-[#000000] text-white min-h-screen ">
      <Container className="grid grid-cols-12 md:py-0 py-[75px]">
        {/* Left Sidebar - Sticky */}
        <div className="lg:col-span-3 md:col-span-4 h-screen sticky top-0 overflow-y-auto md:block hidden">
          <LeftSidebar />
        </div>

        {/* Upper Navbar for sm device */}
        <div className="z-40 md:hidden block">
          <UpperNav />
        </div>

        {/* Middle Content - Scrollable */}
        <div className="lg:col-span-6 md:col-span-8  col-span-full h-screen overflow-y-auto">
          {children}
        </div>

        {/* Right Sidebar - Sticky */}
        <div className="col-span-3 h-screen sticky top-0 overflow-hidden lg:block hidden">
          <FriendsRightSideContent />
        </div>

        {/* bottom nav - fixed */}
        <div className="z-40 md:hidden block">
          <BottomNav />
        </div>
      </Container>
    </div>
  );
};

export default FriendsLayout;
