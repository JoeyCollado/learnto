"use client";

import { usePathname } from "next/navigation";
import React from "react";
import ThemeToggle from "./ThemeToggle"; // Ensure the correct path
import Link from "next/link";
import { useTheme } from "./theme-context";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use ThemeContext
  const pathname = usePathname(); //get current route

  
  const isActive = (path: string) => pathname === path; //function to check if link is active

  return (
    <div
      className={`h-[50px] w-screen top-0 z-10 absolute flex items-center justify-between px-4 ${
        isDarkMode ? "bg-slate-700" : "bg-slate-300"
      }`}
    >
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="items text-[13px]">
    <span className="absolute md:block flex-row top-[-40] w-[150px] mt-4 md:mt-0 md:w-[200px]"><Image src="/learntooo.png" width={200} height={10} alt="learnto image" className=""></Image></span>
        <ul className="flex flex-row md:gap-20 gap-7 ml-40 md:ml-96">
          <Link href="/pages/dashboard">
            <li className={`hover:text-blue-700 transition-all duration-300 ease-in-out ${
                isActive("/pages/dashboard")
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "hover:text-blue-700"
              }`}>Home</li>
          </Link>
          <Link href="/pages/quizArchive/published">
            <li className={`hidden md:block hover:text-blue-700 transition-all duration-300 ease-in-out ${
                isActive("/pages/quizArchive/published")
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "hover:text-blue-700"
              }`}>Quiz Library</li>
            <li className={`md:hidden hover:text-blue-700 transition-all duration-300 ease-in-out ${
                isActive("/pages/quizArchive/published")
                  ? "text-blue-700"
                  : "hover:text-blue-700 border-b-2 border-blue-700"
              }`}>Archive</li>
          </Link>
          <Link href="/pages/quizCreate">
            <li className={`hidden md:block hover:text-blue-700 transition-all duration-300 ease-in-out ${
                isActive("/pages/quizCreate")
                  ? "text-blue-700"
                  : "hover:text-blue-700"
              }`}>Create Quiz</li>
            <li className={`md:hidden hover:text-blue-700 transition-all duration-300 ease-in-out ${
                isActive("/pages/quizCreate")
                  ? "text-blue-700"
                  : "hover:text-blue-700"
              }`}>Create</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
