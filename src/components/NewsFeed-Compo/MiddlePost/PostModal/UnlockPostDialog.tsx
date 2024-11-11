import React from "react";
import userimage from "@/assets/user-2.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaCheck, FaLock } from "react-icons/fa";
import { TPost } from "@/types";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { MdOutlinePayment } from "react-icons/md";

const UnlockPostDialog = ({ post }: { post: TPost }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-pink-600 text-white text-base font-medium min-w-[300px] py-2 px-4 rounded-3xl flex items-center justify-between">
            <span>Unlock Post</span>
            <span>
              <FaLock />
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[360px] overflow-y-auto h-[400px] bg-black">
          <div className="py-4">
            {/* Cover Image */}
            <div className="relative">
              {post?.user?.coverImg ? (
                <Image
                  src={post?.user?.coverImg}
                  alt="User Cover image"
                  width={200}
                  height={200}
                  className="w-full h-[120px] object-cover object-center"
                />
              ) : (
                <div className="w-full h-[120px] bg-gray-700"></div>
              )}
            </div>

            <div className="flex items-center gap-4 px-4 mt-[-40px] ">
              <div className="rounded-full border-4 border-white relative bottom-6">
                {post?.user?.profilePhoto ? (
                  <Image
                    src={post?.user?.profilePhoto}
                    alt="User Profile image"
                    width={80}
                    height={80}
                    className="rounded-full object-cover object-center w-24 h-24"
                  />
                ) : (
                  <Image
                    src={userimage}
                    alt="Default profile image"
                    width={80}
                    height={80}
                    className="rounded-full object-cover object-center w-24 h-24"
                  />
                )}
              </div>

              {/* User Info */}
              <div className="flex flex-col mt-5">
                <p className="flex items-center gap-2">
                  <Link href={`/newsfeed/userprofile/${post?.user?._id}`}>
                    <span className="text-sm text-white font-normal">
                      {post?.user?.name}
                    </span>
                  </Link>
                  {post?.user?.status === "premium" && (
                    <MdVerified className="text-blue-600 w-4 h-4" />
                  )}
                </p>
                <span className="text-sm text-gray-500">
                  {post?.user?.username || "@username"}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <p className="mt-2 text-base text-gray-500 font-bold">
                SUBSCRIBE AND GET THESE BENEFITS:
              </p>
              <ul className="mt-2 text-gray-300 text-sm">
                <li className="flex items-center gap-3">
                  <FaCheck className="text-blue-600" />
                  <span>Full access to this user&rsquo;s content</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-blue-600" />
                  <span>Direct message with this user</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-blue-600" />
                  <span>Cancel your subscription at any time</span>
                </li>
              </ul>
            </div>

            <button className="bg-pink-600 text-white text-base font-medium w-full py-2 px-4 rounded-3xl flex items-center justify-between">
              <span>Pay Now</span>
              <span>
                <MdOutlinePayment />
              </span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnlockPostDialog;
