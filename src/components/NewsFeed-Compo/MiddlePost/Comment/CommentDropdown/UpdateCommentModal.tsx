import React from "react";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { BiLogoTelegram } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { TComment } from "@/types";
import { useUserUpdateComment } from "@/hooks/comment.hook";

interface FormData {
  content: string;
}

const UpdateCommentModal = ({ comment }: { comment: TComment }) => {
  const { handleSubmit, reset, register } = useForm<FormData>();
  const { mutate: updateComment, isPending } = useUserUpdateComment();

  const onSubmit = (data: FormData) => {
    const updateCommentData = {
      commentId: comment._id || "",
      content: data.content,
    };
    updateComment(updateCommentData); // Pass only the content string
    console.log(updateCommentData);
    reset();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <button>
              <p className="flex items-center gap-3 text-white text-sm">
                <FaRegEdit className="text-white" />
                <span>Edit Comment</span>
              </p>
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[490px] overflow-y-auto h-[260px] bg-black ">
          <div className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full border-2 border-pink-600 cursor-pointer">
                <Image
                  src={comment?.user?.profilePhoto || userimage}
                  alt="user profile picture"
                  width={35}
                  height={35}
                  className="rounded-full object-cover object-center w-10 h-10"
                />
              </div>
              <p className="flex flex-col">
                <span className="text-sm text-white font-normal ">
                  {comment?.user?.name}
                </span>
                <span className="text-sm text-gray-500">Public</span>
              </p>
            </div>

            <div className="pt-12">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-3 w-full"
              >
                <textarea
                  {...register("content")}
                  placeholder="Edit Your Comment"
                  defaultValue={comment?.content}
                  className="flex-grow text-sm text-gray-400 h-12 p-3 bg-[#16181C] rounded-md resize-none"
                />
                <button
                  type="submit"
                  className="bg-pink-600 text-white rounded-full p-2"
                >
                  {isPending ? (
                    <div className="w-7 h-7 border-4 border-dashed rounded-full animate-spin border-white"></div>
                  ) : (
                    <BiLogoTelegram className="w-6 h-6" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateCommentModal;
