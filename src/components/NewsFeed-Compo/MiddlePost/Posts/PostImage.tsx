"use client";

import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  images: string[];
  postId: string;
}

export default function ImageGallery({ images, postId }: IProps) {
  const showMoreCount = images.length > 4 ? images.length - 4 : 0;

  return (
    <div className="relative">
      <LightGallery
        elementClassNames={` mt-2 gap-2 grid place-items-center ${
          images.length === 1 ? "grid-cols-1" : "grid-cols-2"
        } `}
        plugins={[lgThumbnail, lgZoom]}
        speed={500}
      >
        {images?.slice(0, 4)?.map((image, index) => (
          <Link
            key={index}
            className={`w-full ${
              images.length === 3 && index === 0 ? "col-span-2" : "col-span-1"
            }`}
            href={image}
          >
            <Image
              alt={`image-${index}`}
              className="lg:h-[350px] h-[320px] w-full object-cover"
              height={500}
              src={image}
              width={500}
            />
          </Link>
        ))}
      </LightGallery>

      {showMoreCount > 0 && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 rounded-lg px-2 pb-1 pt-0.5">
          <Link
            href={`/newsfeed/posts/${postId}`}
            className="text-white font-semibold text-xs"
          >
            +{showMoreCount} more
          </Link>
        </div>
      )}
    </div>
  );
}
