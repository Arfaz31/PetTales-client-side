import { ReactNode } from "react";
import MessageLayoutTopNav from "../_component/module/messageComponent/messageLayoutTopNav";
import MessageLayoutChatbar from "../_component/module/messageComponent/messageSideChatbar";

type TProps = {
  children: ReactNode;
};

const MessageLayout = ({ children }: TProps) => {
  return (
    <div className="bg-black relative h-screen flex flex-col">
      {/* Sticky Navbar */}
      <div>
        <div>
          <div className="sticky top-0 z-50">
            <MessageLayoutTopNav />
          </div>
        </div>
        <div className=" md:hidden block ">
          <div className="sticky top-0 z-50">{/* <UpperNav /> */}</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="md:block hidden xl:col-span-3 lg:col-span-4 md:col-span-3 col-span-full bg-white bg-opacity-10 backdrop-blur-lg shadow-lg border border-gray-400 border-r border-y-0 border-l-0 h-full overflow-y-auto">
          <MessageLayoutChatbar />
        </div>

        {/* Main Content */}
        <div className="xl:col-span-9 lg:col-span-8 md:col-span-9 col-span-full bg-white bg-opacity-10 backdrop-blur-lg shadow-lg h-full overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-[200px] md:w-[300px] h-[300px] bg-pink-400 opacity-70 blur-[100px] absolute top-28 left-20" />
        <div className="w-[200px] md:w-[300px] h-[300px] bg-blue-400 opacity-70 blur-[100px] absolute bottom-10 right-20" />
      </div>
    </div>
  );
};

export default MessageLayout;
