import Container from "@/components/Shared/Container";
import React from "react";

export default function WithDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black">
      {" "}
      <Container>
        {" "}
        <div className="absolute inset-0">
          <div className="w-[200px] md:w-[300px] h-[300px] bg-pink-400 opacity-70 blur-[100px] absolute top-10 left-20" />
          <div className="w-[200px] md:w-[300px] h-[300px] bg-blue-400 opacity-70 blur-[100px] absolute bottom-10 right-20" />
        </div>
        {children}
      </Container>
    </div>
  );
}
