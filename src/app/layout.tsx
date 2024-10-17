import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/Providers";

export const metadata: Metadata = {
  title: "PetTales",
  description:
    "PetTales offers practical pet care tips on nutrition, grooming, and exercise, alongside heartwarming stories of rescue and adoption. Strengthen your bond with your pets while ensuring their health and happiness through expert guidance and touching tales of love and loyalty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
