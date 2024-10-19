import LeftSidebar from "@/components/NewsFeed-Compo/LeftSidebar/LeftSidebar";
import RightSideContent from "@/components/NewsFeed-Compo/RightSideContent/RightSideContent";
import Container from "@/components/Shared/Container";
import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

const NewsFeedLayout = ({ children }: TProps) => {
  return (
    <div className="bg-[#000000] text-white min-h-screen">
      <Container className="grid md:grid-cols-12 grid-cols-1">
        <div className="col-span-3">
          {" "}
          <LeftSidebar />
        </div>
        <div className="col-span-6">{children}</div>
        <div className="col-span-3">
          <RightSideContent />
        </div>
      </Container>
    </div>
  );
};

export default NewsFeedLayout;
