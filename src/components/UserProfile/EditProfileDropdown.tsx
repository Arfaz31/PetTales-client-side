"use client";

import React, { useState } from "react";
import Image from "next/image";
import userimage from "@/assets/user-2.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import FXInput from "@/components/Shared/Form/FXInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { TUser } from "@/types";
import { useUpdateUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import { TbCameraPlus } from "react-icons/tb";
import { MdCancel } from "react-icons/md";

const EditProfileDropdown = ({ user }: { user: TUser }) => {
  const [profileImageFile, setProfileImageFile] = useState<File | "">("");
  const [profileImagePreviews, setProfileImagePreviews] = useState<string | "">(
    user?.profilePhoto || ""
  );
  const [coverImageFile, setCoverImageFile] = useState<File | "">("");
  const [coverImagePreviews, setCoverImagePreviews] = useState<string | "">(
    user?.coverImg || ""
  );

  const { mutate: handleUpdateUser, isPending: updateUserPending } =
    useUpdateUser();
  const methods = useForm({
    defaultValues: {
      name: user?.name || "",
      about: user?.about || "",
      mobileNumber: user?.mobileNumber || "",
      address: user?.address || "",
    },
  });

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<FieldValues> = (userData) => {
    if (!user?._id) {
      toast.error("User ID is missing");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(userData));
    if (profileImageFile) formData.append("profilePhoto", profileImageFile);
    if (coverImageFile) formData.append("coverImg", coverImageFile);

    handleUpdateUser(formData);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImageFile(file);
        setProfileImagePreviews(reader.result as string);
      };

      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; //This line grabs the first file from the files list. Since users can only select one file in this input, e.target.files[0] contains the image file they selected.
      const reader = new FileReader();

      reader.onloadend = () => {
        setCoverImageFile(file);
        setCoverImagePreviews(reader.result as string);
      };

      reader.readAsDataURL(file); // Read the file as data URL. which triggers the onloadend event once the reading is complete.
    }
  };

  const handleRemoveCoverImagePreview = () => {
    setCoverImageFile("");
    setCoverImagePreviews("");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="border rounded-3xl px-3 py-2 text-white text-base font-semibold ">
            Edit Profile
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[490px] overflow-y-auto h-[450px] bg-black">
          <DialogHeader className="bg-black w-full">
            <DialogTitle className="text-white font-bold text-2xl ">
              Edit Profile
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                  {coverImagePreviews ? (
                    <Image
                      src={coverImagePreviews}
                      alt="Cover image preview"
                      width={200}
                      height={200}
                      className="w-full h-[280px] object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-[280px] bg-gray-700"></div>
                  )}
                  <div className="absolute inset-0 flex justify-center items-center gap-8">
                    <label className="cursor-pointer">
                      <p className="bg-black/50 p-2 rounded-full">
                        <TbCameraPlus className="text-white text-2xl " />
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverImageChange}
                      />
                    </label>
                    {coverImagePreviews && (
                      <button
                        onClick={handleRemoveCoverImagePreview}
                        className="bg-black/50 p-2 rounded-full"
                      >
                        <MdCancel className="text-white text-2xl" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="relative -mt-10 flex items-center px-3">
                  <div className="absolute -top-10 left-3 rounded-full border-4 border-white">
                    {profileImagePreviews ? (
                      <Image
                        src={profileImagePreviews}
                        alt="Profile image preview"
                        width={80}
                        height={80}
                        className="rounded-full object-cover object-center w-32 h-32"
                      />
                    ) : (
                      <Image
                        src={userimage}
                        alt="Default profile image"
                        width={80}
                        height={80}
                        className="rounded-full object-cover object-center w-32 h-32"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <label className="cursor-pointer">
                        <p className="bg-black/50 p-2 rounded-full">
                          <TbCameraPlus className="text-white text-xl" />
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfileImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-6 pt-28">
                  <FXInput
                    label="Name"
                    name="name"
                    placeholder="Name"
                    type="text"
                  />
                </div>
                <div className="my-6">
                  <FXInput
                    label="About"
                    name="about"
                    placeholder="Write about yourself"
                    type="text"
                  />
                </div>
                <div className="my-6">
                  <FXInput
                    label="Mobile Number"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    type="text"
                  />
                </div>
                <div className="my-6">
                  <FXInput
                    label="Address"
                    name="address"
                    placeholder="Address"
                    type="text"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-3xl bg-pink-600 hover:bg-pink-500 transition-all ease-in-out duration-500 text-base font-semibold text-white px-8 py-2"
                >
                  {updateUserPending ? (
                    <div className="w-7 h-7 border-4 border-dashed rounded-full animate-spin border-white"></div>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </form>
            </FormProvider>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileDropdown;
