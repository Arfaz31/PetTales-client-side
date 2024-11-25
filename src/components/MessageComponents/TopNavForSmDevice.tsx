"use client";

import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";

const MessageTopNavForSmDevice = () => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "NEWSFEED", link: "/newsfeed" },
    { name: "DOCS", link: "/docs" },
    { name: "PRICING", link: "/pricing" },
    { name: "ABOUT US", link: "/about" },
    { name: "CONTACT", link: "/contact" },
  ];
  return (
    <div>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="text-white bg-transparent ">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                {" "}
                <span className=" sm:text-2xl text-xl    font-bold">
                  PET<span className="text-pink-600">TALES</span>
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className="bg-[#F5F8FA] mt-4">
              <ul className="flex flex-col divide-y divide-gray-400  ">
                {Links.map((link) => (
                  <li
                    key={link.name}
                    className=" pl-6   text-base  py-4 cursor-pointer relative group hover:bg-pink-600 hover:text-white transition-all duration-500 ease-in-out"
                  >
                    <SheetClose asChild>
                      <Link href={link.link} className="relative w-full h-full">
                        {link.name}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MessageTopNavForSmDevice;
