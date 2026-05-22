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
  title: "Santhosh Krishna R — Frontend Systems Engineer",
  description:
    "Cinematic portfolio of Santhosh Krishna R — frontend systems engineer building cross-platform products with Flutter, Next.js, and Firebase.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  openGraph: {
    title: "Santhosh Krishna R — Frontend Systems Engineer",
    description:
      "Cinematic cross-platform portfolio with Flutter, Next.js, and Firebase.",
    type: "website",
  },
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
