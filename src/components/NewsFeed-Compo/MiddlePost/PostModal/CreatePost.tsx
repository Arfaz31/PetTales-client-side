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
import { useCreatePost } from "@/hooks/post.hook";
import GlassLoader from "@/components/Shared/Loading";
import Link from "next/link";
// import dynamic from "next/dynamic"; // Import dynamic from Next.js
// // Dynamically import ReactQuill to load it only on the client side
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// // import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  // const [description, setDescription] = useState(""); // State for React Quill

  const { user } = useUser();

  const methods = useForm();

  const { handleSubmit, reset } = methods;

  const onSuccessCallback = () => {
    reset(); // Reset form fields
    setImageFiles([]); // Clear image files
    setImagePreviews([]); // Clear image previews
    // setDescription(""); // Clear the description
  };

  const { mutate: handleCreatePost, isPending: createPostPending } =
    useCreatePost(onSuccessCallback);

  const onSubmit: SubmitHandler<FieldValues> = (postData) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(postData));

    // eslint-disable-next-line prefer-const
    for (let image of imageFiles) {
      formData.append("postImages", image);
    }
    //is a loop that iterates through each item in imageFiles (an array or iterable containing image file objects) and appends each image file to formData with the key "postImages".

    handleCreatePost(formData);
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

  const petTags = [
    "#PetTales",
    "#AdoptPets",
    "#PetCare",
    "#PetLife",
    "#PetHealth",
    "#PetLovers",
    "#CutePets",
    "#PetTraining",
    "#PetWellness",
    "#PetFriends",
    "#RescuePets",
    "#PetCommunity",
  ];

  return (
    <>
      {createPostPending && <GlassLoader />}
      <div>
        <div className="  p-2 grid grid-cols-12  gap-2">
          <div className="flex items-center gap-3 xl:col-span-3 md:col-span-4 col-span-5">
            <Link
              href={`/newsfeed/userprofile/${user?._id}`}
              className="rounded-full border-2 border-pink-600 cursor-pointer"
            >
              <Image
                src={user?.profilePhoto || userimage}
                alt="user profile picture"
                width={35}
                height={35}
                className="rounded-full object-cover object-center w-10 h-10"
              />
            </Link>
            <div className="flex flex-col ">
              <Link href={`/newsfeed/userprofile/${user?._id}`}>
                <span className="text-sm text-white font-normal ">
                  {user?.name?.split(" ")[0]}
                </span>
              </Link>

              <span className="text-sm text-gray-500">Create post</span>
            </div>
          </div>

          <div className="xl:col-span-9 md:col-span-8 col-span-7 w-full mx-auto md:ps-3 ps-0 pt-1">
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <button className="text-gray-500 md:text-sm text-xs text-start rounded-3xl w-full  border py-2 md:ps-4 ps-2 border-gray-600 bg-[#121212]">
                    What&apos;s on your mind {user?.name}?
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
                          {/* <div className="mb-6 text-gray-400 ">
                            <ReactQuill
                              value={description}
                              onChange={setDescription}
                              placeholder="Write your post here"
                              modules={{
                                toolbar: [
                                  [
                                    { header: "1" },
                                    { header: "2" },
                                    { font: [] },
                                  ],
                                  [{ list: "ordered" }, { list: "bullet" }],
                                  ["bold", "italic", "underline", "blockquote"],
                                  ["image", "link"],
                                  ["clean"],
                                ],
                              }}
                              theme="snow"
                            />
                          </div> */}

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
                            Submit
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
        <div className="grid xl:grid-cols-5 grid-cols-4 gap-2 pt-4">
          {petTags.map((tag, index) => (
            <div
              key={index}
              className="text-gray-500 md:text-sm sm:text-xs text-[10px] text-center rounded-3xl w-full border py-1 border-gray-600 bg-[#121212]"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreatePost;
