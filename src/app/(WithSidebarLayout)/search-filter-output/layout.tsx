import LeftSidebar from "@/components/NewsFeed-Compo/LeftSidebar/LeftSidebar";
import Container from "@/components/Shared/Container";
import { ReactNode } from "react";
import UpperNav from "@/components/NewsFeed-Compo/SmDeviceNav/UpperNav";
import BottomNav from "@/components/NewsFeed-Compo/SmDeviceNav/BottomNav";
import SearchFilterRightSideContent from "../_component/module/searchFilterRightSideContent";

type TProps = {
  children: ReactNode;
};

const SearchFilterLayout = ({ children }: TProps) => {
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
          <SearchFilterRightSideContent />
        </div>

        {/* bottom nav - fixed */}
        <div className="z-40 md:hidden block">
          <BottomNav />
        </div>
      </Container>
    </div>
  );
};

export default SearchFilterLayout;
