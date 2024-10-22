/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FXForm from "@/components/Shared/Form/FXForm";
import FXSelect from "@/components/Shared/Form/FXSelect";
import { useRouter } from "next/navigation";
import React from "react";

const PostFilter = () => {
  const router = useRouter();
  const onSubmit = (data: any) => {
    const { category } = data;
    router.push(`/newsfeed?category=${category}`);
  };
  return (
    <div>
      <FXForm onSubmit={onSubmit}>
        <FXSelect
          name="category"
          label="Select Category"
          options={[
            { key: "All Post", label: "All Post" },
            { key: "Tip", label: "Tip" },
            { key: "Story", label: "Story" },
          ]}
          className="w-[30%]"
        />
      </FXForm>
    </div>
  );
};

export default PostFilter;
