import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaMagnifyingGlass } from "react-icons/fa6";
import PostSearch from "./PostSearch";
const PostSearchModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`flex items-center justify-center hover:bg-[#16181C] text-lg border border-gray-600  text-white rounded-full 
             
            `}
          >
            <span className="text-white w-8 h-8 flex items-center justify-center">
              <FaMagnifyingGlass />
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]  bg-black">
          <DialogHeader>
            <DialogTitle className="text-white">Search Post</DialogTitle>
          </DialogHeader>
          <div className="h-[380px] pt-6">
            <PostSearch />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostSearchModal;
