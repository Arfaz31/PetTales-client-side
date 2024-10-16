import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

const CommonLayout = ({ children }: TProps) => {
  return (
    <div className="  ">
      <div className="bg-black relative ">
        <Navbar />
        {/* Blurred Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-[200px] md:w-[300px] h-[300px] bg-pink-400 opacity-70 blur-[100px] absolute top-10 left-20" />
          <div className="w-[200px] md:w-[300px] h-[300px] bg-blue-400 opacity-70 blur-[100px] absolute bottom-10 right-20 " />
        </div>

        <div className="relative z-10">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
