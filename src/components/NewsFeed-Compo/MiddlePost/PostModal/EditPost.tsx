"use client";

import { useUser } from "@/context/user.provider";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FXInput from "@/components/Shared/Form/FXInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import FXSelect from "@/components/Shared/Form/FXSelect";
import FXTextArea from "@/components/Shared/Form/FXTextarea";
import { IoIosImages } from "react-icons/io";
import { FaX } from "react-icons/fa6";
import { useUpdatePost } from "@/hooks/post.hook";
import { TPost } from "@/types";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";

const EditPost = ({ post }: { post: TPost }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>(
    post?.images || []
  );
  // const [description, setDescription] = useState(""); // State for React Quill
  const postId = post?._id;
  const { user } = useUser();

  const methods = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      category: post?.category || "",
      contentType: post?.contentType || "basic",
      price: post?.price || "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSuccessCallback = () => {
    reset(); // Reset form fields
    setImageFiles([]); // Clear image files
    setImagePreviews([]); // Clear image previews
  };

  const { mutate: handleUpdatePost, isPending: updatePostPending } =
    useUpdatePost(onSuccessCallback);

  const onSubmit: SubmitHandler<FieldValues> = (postData) => {
    if (!postId) {
      toast.error("Post ID is missing");
      return;
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(postData));

    // eslint-disable-next-line prefer-const
    for (let image of imageFiles) {
      formData.append("postImages", image);
    }
    //is a loop that iterates through each item in imageFiles (an array or iterable containing image file objects) and appends each image file to formData with the key "postImages".

    handleUpdatePost({ postId, formData }); // Pass as UpdatePostData
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Get all selected files
    if (files) {
      const newFiles = Array.from(files); // Convert FileList to an array

      // Update imageFiles state with all selected files
      setImageFiles((prev) => [...prev, ...newFiles]);

      // Create image previews for all selected files
      const newPreviews: string[] = [];
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string); // Collect the image previews
          // Update state with previews after all files are read
          if (newPreviews.length === newFiles.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file); // Read the file as data URL
      });
    }
  };

  const handleRemoveImagePreview = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    //For every item in prev, it checks if i (the current index) matches index. If it doesn’t match, it keeps the item; if it does, it removes it.
  };

  return (
    <>
      {/* {updatePostPending && <GlassLoader />} */}
      <div>
        <div className=" w-full ">
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <button className="text-sm ">
                  <p className="flex items-center gap-3 text-white">
                    <FaRegEdit className="text-white" />
                    <p>Edit Post</p>
                  </p>
                </button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[490px] overflow-y-auto  h-[450px] bg-black ">
              <div className=" py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border-2 border-pink-600 cursor-pointer">
                    <Image
                      src={user?.profilePhoto || userimage}
                      alt="user profile picture"
                      width={35}
                      height={35}
                      className="rounded-full object-cover object-center w-10 h-10"
                    />
                  </div>
                  <p className="flex flex-col ">
                    <span className="text-sm text-white font-normal ">
                      {user?.name}
                    </span>
                    <span className="text-sm text-gray-500">Public</span>
                  </p>
                </div>

                <div className="pt-5">
                  <div>
                    <FormProvider {...methods}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-6">
                          <FXInput
                            label="Title"
                            name="title"
                            placeholder="Title"
                            type="text"
                            className="min-w-fit "
                          />
                        </div>
                        <div className="mb-6">
                          <FXTextArea
                            name="content"
                            label="Content"
                            placeholder="Write your post here"
                            className="min-w-fit "
                          />
                        </div>

                        <div className=" mb-6">
                          <FXSelect
                            name="category"
                            label="Select Category"
                            options={[
                              { key: "Tip", label: "Tip" },
                              { key: "Story", label: "Story" },
                            ]}
                          />
                        </div>
                        <div className="mb-6">
                          <TooltipProvider>
                            {user?.status === "basic" ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <FXSelect
                                      name="contentType"
                                      label="Select Content Type"
                                      options={[
                                        { key: "basic", label: "Basic" },
                                        {
                                          key: "premium",
                                          label: "Premium",
                                          disabled: true, // Disable premium for basic users
                                        },
                                      ]}
                                    />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Get verified to post premium content</p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <FXSelect
                                name="contentType"
                                label="Select Content Type"
                                options={[
                                  { key: "basic", label: "Basic" },
                                  { key: "premium", label: "Premium" },
                                ]}
                              />
                            )}
                          </TooltipProvider>
                        </div>

                        <div className=" mb-6">
                          <FXInput
                            label="Price"
                            name="Price"
                            placeholder="Price"
                            type="number"
                            className="min-w-fit "
                          />
                        </div>

                        {/* Image Upload */}
                        <div className="pb-6 ">
                          <label className=" cursor-pointer text-xs text-pink-400 my-5 flex gap-2 items-center ">
                            <IoIosImages className="text-2xl" />
                            <p>Upload Images</p>
                            <input
                              type="file"
                              accept="image/*"
                              id="image"
                              multiple
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                          <div className="flex flex-wrap mt-2">
                            {imagePreviews.map((preview, index) => (
                              <div key={index} className="relative mr-2 mb-2">
                                <Image
                                  src={preview}
                                  alt="Image Preview"
                                  width={100}
                                  height={100}
                                  className="rounded w-[100px] h-[80px] object-cover"
                                />
                                <button
                                  className="absolute top-1 right-1 bg-pink-500 text-white rounded-full p-1 text-[8px]"
                                  onClick={() =>
                                    handleRemoveImagePreview(index)
                                  }
                                >
                                  <FaX />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 text-base font-semibold text-white text-center px-8 py-2 "
                        >
                          {updatePostPending ? (
                            <div className=" w-7  h-7  border-4 border-dashed rounded-3xl animate-spin  border-white"></div>
                          ) : (
                            <span>Submit</span>
                          )}
                        </button>
                      </form>
                    </FormProvider>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default EditPost;
