import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

const MessageLayout = ({ children }: TProps) => {
  return (
    <div className="bg-black  flex flex-col">
      {/* Sticky Navbar */}
      {/* <div className="sticky top-0 overflow-y-hidden z-50">
        <MessageLayoutTopNav />
      </div> */}

      {/* Main Layout */}
      <div className="h-screen">{children}</div>

      {/* Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-[200px] md:w-[300px] h-[300px] bg-pink-400 md:opacity-60 opacity-10 blur-[100px] absolute top-28 left-20" />
        <div className="lg:block hidden w-[200px] md:w-[300px] h-[300px] bg-blue-400 opacity-60 blur-[100px] absolute bottom-10 right-20" />
      </div>
    </div>
  );
};

export default MessageLayout;
