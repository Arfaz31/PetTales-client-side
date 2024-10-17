"use client";

import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Container from "@/components/Shared/Container";
import { usePathname } from "next/navigation";
const LgNav = () => {
  const currentPath = usePathname();
  const Links = [
    { name: "HOME", link: "/" },
    { name: "NEWSFEED", link: "/newsfeed" },
    { name: "DOCS", link: "/docs" },
    { name: "PRICING", link: "/pricing" },
    { name: "ABOUT US", link: "/about" },
    { name: "CONTACT", link: "/contact" },
  ];
  return (
    <Container>
      <div className=" sticky top-0 z-50 ">
        <div className="flex justify-between items-center ">
          <div>
            <Link className="flex items-center gap-1 " href="/">
              <Image
                className=" xl:w-[40px] w-[40px]  "
                src={logo}
                alt="logo"
              />
              <span className=" xl:text-4xl text-2xl text-white   font-bold">
                PET<span className="text-pink-600">TALES</span>
              </span>
            </Link>
          </div>

          <div className={`flex items-center`}>
            <ul className="flex">
              {Links.map((link) => (
                <li
                  key={link.name}
                  className="xl:pl-8 pl-6 text-white lg:text-lg text-base xl:py-6 py-4 cursor-pointer relative group transition-all duration-500 ease-in-out"
                >
                  <Link href={link.link} className="relative  w-full h-full">
                    {link.name}

                    <span
                      className={` absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-pink-600 transition-all duration-500 ease-in-out top-7 group-focus:w-full ${
                        currentPath === link.link ? "w-full" : ""
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button className="bg-pink-600 hover:bg-pink-500 text-white py-[5px] px-4 text-lg rounded-sm">
              Login
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LgNav;
