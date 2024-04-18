import type { Metadata } from "next";
import Navigation from "./components/navigation";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/app/thirdweb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelWorld 2D Verse",
  description:
    "Welcome to 2D Pixelworld",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThirdwebProvider>
        <Navigation />
        {children}
      </ThirdwebProvider>
      </body>
    </html>
  );
}
