import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const IBMPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  display: 'swap'
});


export const metadata: Metadata = {
  title: "Bookify",
  description: "Generate a full audio conversation to fully understant each struggle book you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IBMPlexMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
