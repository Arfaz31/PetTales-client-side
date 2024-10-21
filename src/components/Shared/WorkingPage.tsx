import Link from "next/link";
import React from "react";

type WorkingPageProps = {
  pageName: string;
  icon: React.ReactNode; // icon will be passed as a React element
};
const WorkingPage = ({ pageName, icon }: WorkingPageProps) => {
  return (
    <div className=" border border-gray-600 min-h-screen border-y-0 bg-black py-2  ">
      <div className=" sticky top-0 z-50 bg-black w-full  mb-10">
        <div className="flex items-center w-full justify-between px-4 pt-2 pb-4">
          <div>
            <div>
              <h2 className="  text-2xl font-bold text-white ">{pageName}</h2>
            </div>
          </div>
          <div>
            <span className="text-white">{icon}</span>
          </div>
        </div>
        <hr className="border-gray-600" />
      </div>

      <div className="flex flex-col items-center justify-center space-y-3 px-4">
        <div className="flex justify-center text-slate-300 items-center mb-3">
          <p className="text-5xl font-thin">W</p>
          <div className="w-10 h-10 border-8 border-dashed rounded-full animate-spin mt-4 border-pink-600"></div>
          <p className="text-5xl font-thin">rking on this page...</p>
        </div>
        <div>
          <p className="text-start">Wait for next update...</p>
        </div>
        <Link href="/newsfeed">
          <button className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 text-lg font-bold text-white text-center px-8 py-3 ">
            Back To Newsfeed
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WorkingPage;
