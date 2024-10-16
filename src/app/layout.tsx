import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
