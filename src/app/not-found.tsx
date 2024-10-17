import React from "react";
import error from "@/assets/errorpage.png";
import Image from "next/image";
import Link from "next/link";
const NotFoundPage = () => {
  return (
    <div>
      <div>
        <div className="w-1/2 mx-auto ">
          <Image src={error} width={500} height={400} alt="errorpage" />
        </div>
        <div className="w-max mx-auto mb-12">
          <Link href="/">
            <button className="bg-pink-600 text-white px-4 py-2">
              Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
