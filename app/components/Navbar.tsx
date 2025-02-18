"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle"; // Ensure the correct path
import Link from "next/link";
import { useTheme } from "./theme-context";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use ThemeContext

  return (
    <div
      className={`h-[70px] w-screen top-0 z-10 absolute flex items-center justify-between px-4 ${
        isDarkMode ? "bg-slate-700" : "bg-slate-300"
      }`}
    >
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="items">
    <span className="absolute md:block flex-row top-[-30] w-[150px] mt-4 md:mt-0 md:w-[200px]"><Image src="/learntooo.png" width={200} height={10} alt="learnto image" className=""></Image></span>
        <ul className="flex flex-row md:gap-20 gap-7 ml-40 md:ml-96">
          <Link href="/pages/dashboard">
            <li className="hover:text-blue-700 transition-all duration-300 ease-in-out">Home</li>
          </Link>
          <Link href="/pages/quizArchive/published">
            <li className="hidden md:block hover:text-blue-700 transition-all duration-300 ease-in-out">Quiz Library</li>
            <li className="md:hidden hover:text-blue-700 transition-all duration-300 ease-in-out">Archive</li>
          </Link>
          <Link href="/pages/quizCreate">
            <li className="hidden md:block hover:text-blue-700 transition-all duration-300 ease-in-out">Create Quiz</li>
            <li className="md:hidden hover:text-blue-700 transition-all duration-300 ease-in-out">Create</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
