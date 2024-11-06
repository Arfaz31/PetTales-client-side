import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdDelete } from "react-icons/md";
import { useUserDeletePost } from "@/hooks/post.hook";

const DeletePost = ({ postId }: { postId: string }) => {
  const { mutate: handleDeletePost, isPending: deletePostPending } =
    useUserDeletePost();

  const handleDelete = () => {
    handleDeletePost(postId);
  };

  return (
    <div className=" w-full ">
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <button className="text-sm ">
              <p className="flex items-center gap-3 text-white text-sm">
                <MdDelete className="text-white" />
                <p>Delete Post</p>
              </p>
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[490px] overflow-y-auto   bg-black ">
          <DialogHeader>
            <DialogTitle>
              <p className="text-white text-xl font-bold pb-4">
                Confirm Delete
              </p>
            </DialogTitle>
            <DialogDescription>
              <p className="text-white text-base pb-6">
                Are you sure, you want to delete this post?{" "}
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center gap-10 pb-3">
            <button
              onClick={handleDelete}
              className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 text-base font-semibold text-white text-center px-8 py-2 "
            >
              {deletePostPending ? (
                <div className=" w-7  h-7  border-4 border-dashed rounded-3xl animate-spin  border-white"></div>
              ) : (
                <span>Delete</span>
              )}
            </button>
            <DialogClose asChild>
              <button className="rounded-3xl bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-500 text-base font-semibold text-white text-center px-8 py-2 ">
                Cancel
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeletePost;
