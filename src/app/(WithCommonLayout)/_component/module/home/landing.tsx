import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { GoHeart } from "react-icons/go";

const LandingBanner = () => {
  return (
    <div>
      <section className="relative  flex flex-col items-center justify-center gap-4  overflow-hidden h-[670px] pb-20 md:px-0 px-4">
        {/* Main Content */}

        <div className="flex text-pink-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <GoHeart key={i} className="smooth-pulse " size={35} />
          ))}
        </div>
        <div className="inline-block max-w-xl text-center justify-center z-10  text-white">
          <h1 className="text-4xl md:text-6xl font-bold  tracking-wide  ">
            Explore Pet Care Tips & Stories
          </h1>
          <div className="text-lg md:text-xl mt-6 mb-2  text-white">
            Discover expert advice on pet care, nutrition, and grooming, along
            with inspiring stories that highlight the deep bond between pets and
            their owners.
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-5 z-10">
          <Link href={"/newsfeed"}>
            <button className="bg-pink-600 hover:bg-pink-500 text-white py-3 px-4 rounded-sm transition-transform duration-300 ease-in-out transform hover:scale-105">
              Explore Now
            </button>
          </Link>
          <button className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-sm transition-transform duration-300 ease-in-out transform hover:scale-105">
            Learn More
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-6 mt-6 z-10">
          <FaFacebook
            className="text-blue-600 hover:scale-110 transition-transform ease-in-out"
            size={28}
          />
          <FaInstagram
            className="text-pink-600 hover:scale-110 transition-transform ease-in-out"
            size={28}
          />
          <FaTwitter
            className="text-blue-400 hover:scale-110 transition-transform ease-in-out"
            size={28}
          />
        </div>

        <div className="mt-8 z-10 rounded-md border-2 border-gray-500 p-4">
          <p className="text-white sm:text-base text-sm">
            Get started with{" "}
            <span className="bg-[#001630] py-1 px-2 rounded-sm">
              PETTALES Community
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingBanner;
