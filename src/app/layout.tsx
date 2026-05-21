import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/atmosphere/SmoothScroll";
import { CursorTracker } from "@/components/atmosphere/CursorTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SANthosh OS",
  description: "Cinematic portfolio interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <body>
        <CursorTracker />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
