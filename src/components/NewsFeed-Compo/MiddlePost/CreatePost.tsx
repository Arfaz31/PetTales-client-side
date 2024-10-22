"use client";

import { useUser } from "@/context/user.provider";
import React from "react";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FXForm from "@/components/Shared/Form/FXForm";
import FXInput from "@/components/Shared/Form/FXInput";
import { SubmitHandler } from "react-hook-form";
import FXSelect from "@/components/Shared/Form/FXSelect";

type TPost = {
  _id?: string;
  title: string;
  content: string;
  images?: string[];
  category: "Tip" | "Story";
  contentType: "basic" | "premium";
  price?: number;
};

const CreatePost = () => {
  const { user } = useUser();
  const onSubmit: SubmitHandler<TPost> = (data) => {
    if (data) {
      console.log(data);
    }
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
    <div>
      <div className="  p-2 grid grid-cols-12  gap-2">
        <div className="flex items-center gap-3 xl:col-span-3 md:col-span-4 col-span-5">
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
            <span className="text-sm text-gray-500">Create post</span>
          </p>
        </div>

        <div className="xl:col-span-9 md:col-span-8 col-span-7 w-full mx-auto md:ps-3 ps-0 pt-1">
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <button className="text-gray-500 md:text-sm text-xs text-start rounded-3xl w-full  border py-2 md:ps-4 ps-2 border-gray-600 bg-[#121212]">
                  What&apos;s on your mind{user?.name}?
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
                    <FXForm onSubmit={onSubmit}>
                      <div className="py-3">
                        <FXInput
                          label="Title"
                          name="title"
                          placeholder="Title"
                          type="text"
                          className="min-w-fit "
                        />
                      </div>
                      <div className="py-3 mb-4">
                        <FXInput
                          label="Price"
                          name="Price"
                          placeholder="Price"
                          type="number"
                          className="min-w-fit "
                        />
                      </div>
                      <div className=" mb-4">
                        <FXSelect
                          name="category"
                          label="Select Category"
                          options={[
                            { key: "Tip", label: "Tip" },
                            { key: "Story", label: "Story" },
                          ]}
                        />
                      </div>

                      <button
                        type="submit"
                        className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 text-base font-semibold text-white text-center px-8 py-2 "
                      >
                        Submit
                      </button>
                    </FXForm>
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
  );
};

export default CreatePost;
