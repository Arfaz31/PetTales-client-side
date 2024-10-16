"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // If you're using Next.js for images
import petlove from "@/assets/petlove.jpg";
import Container from "@/components/Shared/Container";
import teamMember1 from "@/assets/teamMember/team-1.jpg";
import teamMember2 from "@/assets/teamMember/team-2.jpg";
import teamMember3 from "@/assets/teamMember/team-3.jpg";
import teamMember4 from "@/assets/teamMember/team-5.jpg";
import teamMember5 from "@/assets/teamMember/team-6.jpg";
import teamMember6 from "@/assets/teamMember/team-8.jpg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  FaFacebookF,
  FaInstagram,
  FaSkype,
  FaSquareXTwitter,
} from "react-icons/fa6";
export default function AboutUs() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const teamMemberData = [
    {
      id: 1,
      image: (className: string) => (
        <Image src={teamMember1} alt="team member" className={className} />
      ),

      name: "Anselm Hannemen",
      role: "Web Developer",
    },
    {
      id: 2,
      image: (className: string) => (
        <Image src={teamMember2} alt="team member" className={className} />
      ),

      name: "Emily Johnson",
      role: "Product Manager",
    },
    {
      id: 3,
      image: (className: string) => (
        <Image src={teamMember3} alt="team member" className={className} />
      ),

      name: "Sarah Williams",
      role: "Supervisor",
    },
    {
      id: 4,
      image: (className: string) => (
        <Image src={teamMember4} alt="team member" className={className} />
      ),

      name: "Sarah Williams",
      role: "Advisor",
    },
    {
      id: 5,
      image: (className: string) => (
        <Image src={teamMember5} alt="team member" className={className} />
      ),

      name: "Sarah Williams",
      role: "Supervisor",
    },
    {
      id: 6,
      image: (className: string) => (
        <Image src={teamMember6} alt="team member" className={className} />
      ),

      name: "Sarah Williams",
      role: "Social Analyst",
    },
  ];
  return (
    <Container>
      <div className="py-10 ">
        {/* About Company Section */}
        <section className="p-5 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-pink-400 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            WELCOME TO PETTALES
          </motion.h1>

          <motion.h2
            className="text-lg sm:text-xl font-semibold text-gray-300 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Your Go-To Platform for Pet Care Tips and Inspiring Stories
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8 opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            At Pettales, we believe that pets are family. Our platform is
            dedicated to providing the best pet care advice and sharing
            heartwarming stories that celebrate the unique bond between pets and
            their humans. Whether you’re looking for tips, expert advice, or
            uplifting stories, we’ve got you covered!
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-pink-600 shadow-lg">
              <Image
                src={petlove} // Replace with actual image path
                alt="About Company"
                className="object-cover w-full h-full"
                width={200}
                height={200}
              />
            </div>
          </motion.div>
        </section>

        {/* Our Journey & Milestones Section */}
        <section className="py-12">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Journey & Milestones
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-base sm:text-lg text-gray-400 mb-6 opacity-80">
              From humble beginnings, Pettales has grown into a community of pet
              lovers. Our mission is to ensure that every pet gets the care they
              deserve, and our vision is to be the leading platform for trusted
              pet care advice and inspiring stories.
            </p>

            <p className="text-base sm:text-lg text-gray-400 mb-6 opacity-80">
              Over the years, we&apos;ve built a platform where users can
              connect, share experiences, and access premium content that helps
              them care for their furry companions. Our commitment to pets and
              their well-being is reflected in everything we do.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center mt-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <div className="bg-gray-700 p-5 rounded-lg shadow-lg bg-opacity-80">
              <h3 className="text-xl sm:text-2xl font-semibold text-pink-400 mb-3">
                Mission
              </h3>
              <p className="text-gray-400">
                Our mission is to empower pet owners with valuable knowledge to
                ensure their pets live happy, healthy, and fulfilling lives.
              </p>
            </div>

            <div className="bg-gray-700 p-5 rounded-lg shadow-lg bg-opacity-80">
              <h3 className="text-xl sm:text-2xl font-semibold text-pink-400 mb-3">
                Vision
              </h3>
              <p className="text-gray-400">
                We envision a world where every pet receives the love, care, and
                attention they need, and where owners feel confident in their
                ability to provide the best for their pets.
              </p>
            </div>

            <div className="bg-gray-700 p-5 rounded-lg shadow-lg bg-opacity-80">
              <h3 className="text-xl sm:text-2xl font-semibold text-pink-400 mb-3">
                Milestones
              </h3>
              <p className="text-gray-400">
                Since our launch, we have helped over 10,000 pet owners connect
                with trusted advice, support adoption initiatives, and offer
                premium content to pet enthusiasts worldwide.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Our Team Section */}
        <section>
          {/* TeamMembers */}
          <div className="py-12">
            <h1 className="xl:text-4xl lg:text-3xl text-2xl font-bold text-center text-gray-300">
              Meet our best professional
            </h1>
            <div className="flex items-center gap-3 xl:w-[435px] lg:w-[350px] w-[285px] mx-auto md:mb-10 mb-4">
              <span className="bg-pink-600 xl:w-14 lg:w-10 w-8 h-2"></span>
              <h1 className="xl:text-4xl lg:text-3xl text-2xl font-bold text-center text-gray-300">
                Team Members
              </h1>
              <span className="bg-pink-600 xl:w-14 lg:w-10 w-8 h-2"></span>
            </div>

            <div>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full "
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {teamMemberData.map((member) => (
                    <CarouselItem
                      key={member.id}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <Card className="border-none ">
                          <CardContent className="flex flex-col relative aspect-square items-center justify-center p-6 bg-black/95 border border-pink-600">
                            <div>
                              {member.image(
                                "xl:w-[320px] xl:h-[362px] lg:w-[250px] lg:h-[284px] md:w-[305px] md:h-[345px] sm:w-[325px] sm:h-[385px] w-[272px] h-[330px]"
                              )}
                            </div>

                            <div className=" bg-white shadow-xl border-r-2  xl:w-[320px] xl:h-[120px] lg:w-[250px] lg:h-[110px] md:w-[305px] md:h-[120px] sm:w-[325px] sm:h-[120px]  w-[272px] h-[110px] border-pink-600  border-b-2 relative">
                              <div className="absolute xl:bottom-[100px] lg:bottom-[90px] md:bottom-[100px] sm:bottom-[100px] bottom-[90px]  left-1/2 transform -translate-x-1/2 flex gap-5 items-center justify-center ">
                                <span className="inline-block bg-pink-600 rounded-full p-2 cursor-pointer hover:bg-pink-500">
                                  <FaFacebookF className="text-white w-6 h-6" />
                                </span>
                                <span className="inline-block bg-pink-600 rounded-full p-2 cursor-pointer hover:bg-pink-500">
                                  <FaInstagram className="text-white w-6 h-6" />
                                </span>
                                <span className="inline-block bg-pink-600 rounded-full p-2 cursor-pointer hover:bg-pink-500">
                                  <FaSquareXTwitter className="text-white w-6 h-6" />
                                </span>
                                <span className="inline-block bg-pink-600 rounded-full p-2 cursor-pointer hover:bg-pink-500">
                                  <FaSkype className="text-white w-6 h-6" />
                                </span>
                              </div>

                              <p className="xl:text-xl lg:text-lg font-bold text-center xl:pt-10 lg:pt-8 pt-10">
                                {member.name}
                              </p>
                              <p className="text-base text-center text-[#82828a]">
                                {member.role}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-pink-700 bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
                  &#9664;
                </CarouselPrevious>
                <CarouselNext className="absolute right-0 top-1/2  transform -translate-y-1/2 text-white bg-pink-700 bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
                  &#9654;
                </CarouselNext>
              </Carousel>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
