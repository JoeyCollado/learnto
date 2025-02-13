import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from '@clerk/nextjs'
import { ThemeProvider } from "./components/theme-context";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ranielle is my simp",
  description: "LearnTo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
       <ThemeProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="mb-5 z-20 transition-all duration-300 ease-in-out">
          <SignedOut>
            <div className="flex flex-row-reverse m-2 z-20 transition-all duration-300 ease-in-out">
              <div className={` rounded-md px-2 z-20  hover:text-blue-700 transition-all duration-300 ease-in-out`}>
                <div className="text-2xl text-center font-bold flex  transition-all duration-300 ease-in-out border-r-2 border-l-2 rounded-md px-2 mt-2">
            <SignInButton />
                </div>
            </div>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex justify-end gap-5 m-2 z-20">
            <div className="z-20 mt-[14px]">
            <UserButton />
            </div>
            <div className="rounded-md border-r-2 border-l-2 px-2 h-7 z-20 mr-4 mt-[14px] hover:text-blue-700 transition-all duration-300 ease-in-out">
            <SignOutButton/>
            </div>
            </div>
          </SignedIn>
        </header>
         
        {children}
       
      
      </body>
    </html>
    </ThemeProvider>
    </ClerkProvider>
  );
}
