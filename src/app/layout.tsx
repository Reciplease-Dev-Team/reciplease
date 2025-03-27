import type { Metadata } from "next/types";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers/nextauth-provider";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import NavBar from "../components/navigation/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reciplease",
  description: "AI-powered recipe recommendations for your health",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (session) {
    console.log("session on layout: ", session);
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProvider session={session ? session : undefined}>
          <NavBar />
          <div className=" overflow-y-auto">
            {children}
            <Toaster />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
