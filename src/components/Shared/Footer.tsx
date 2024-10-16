import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="w-full bg-black  py-8 px-4 flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 mb-4">
        <Link
          href="/"
          title="PetTales homepage"
          className="flex items-center gap-2  "
        >
          <span className="text-white ">Powered by</span>
          <span className="  text-xl text-white   font-bold">
            PET<span className="text-pink-600">TALES</span>
          </span>
        </Link>
      </div>

      <div className="text-sm text-white text-default-400 text-center">
        <p>&copy; {currentYear} All rights reserved.</p>
      </div>
    </footer>
  );
}
