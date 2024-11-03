import LeftSidebar from "@/components/NewsFeed-Compo/LeftSidebar/LeftSidebar";
import RightSideContent from "@/components/NewsFeed-Compo/RightSideContent/RightSideContent";
import BottomNav from "@/components/NewsFeed-Compo/SmDeviceNav/BottomNav";
import UpperNav from "@/components/NewsFeed-Compo/SmDeviceNav/UpperNav";
import Container from "@/components/Shared/Container";
import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

const NewsFeedLayout = ({ children }: TProps) => {
  return (
    <div className="bg-[#000000] text-white min-h-screen">
      <Container className="grid grid-cols-12 md:py-0 py-[75px]">
        {/* Left Sidebar - Sticky */}
        <div className="lg:col-span-3 md:col-span-4 hidden md:block sticky top-0 h-screen overflow-y-auto">
          <LeftSidebar />
        </div>

        {/* Upper Navbar for small devices */}
        <div className="z-40 md:hidden block">
          <UpperNav />
        </div>

        {/* Middle Content - Scrollable */}
        <div className="lg:col-span-6 md:col-span-8 col-span-full  ">
          {children}
        </div>

        {/* Right Side Content - Sticky */}
        <div className="lg:col-span-3 col-span-full sticky top-0 hidden lg:block h-screen overflow-y-auto">
          <RightSideContent />
        </div>

        {/* Bottom Nav for small devices */}
        <div className="z-40 md:hidden block">
          <BottomNav />
        </div>
      </Container>
    </div>
  );
};

export default NewsFeedLayout;
