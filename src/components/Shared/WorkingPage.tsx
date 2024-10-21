import Link from "next/link";
import React from "react";

type WorkingPageProps = {
  pageName: string;
  icon: React.ReactNode; // icon will be passed as a React element
};
const WorkingPage = ({ pageName, icon }: WorkingPageProps) => {
  return (
    <div className=" md:border-x border-gray-600 min-h-screen  bg-black py-2  ">
      <div className=" md:sticky static top-0 z-50 bg-black w-full  mb-10">
        <div className="flex items-center w-full justify-between md:px-4 px-0 pt-2 pb-4">
          <div>
            <div>
              <h2 className="  md:text-2xl text-xl font-bold text-white ">
                {pageName}
              </h2>
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
          <p className="xl:text-5xl text-3xl font-thin">W</p>
          <div className="xl:w-10 w-7 xl:h-10 h-7 border-8 border-dashed rounded-full animate-spin mt-4 border-pink-600"></div>
          <p className="xl:text-5xl text-3xl font-thin">
            rking on this page...
          </p>
        </div>
        <div>
          <p className="text-start">Wait for next update...</p>
        </div>
        <Link href="/newsfeed">
          <button className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 xl:text-lg text-base font-bold text-white text-center xl:px-8 px-6 py-3 ">
            Back To Newsfeed
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WorkingPage;
