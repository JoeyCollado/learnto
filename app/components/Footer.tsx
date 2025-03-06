"use client";

import Link from "next/link";
import React from "react";
import { Facebook, Github, Twitter } from "lucide-react";
import { useTheme } from "./theme-context"; //just import this to any component to inherit darkmode logic

const Footer = () => {
  const { isDarkMode } = useTheme(); // Get dark mode state from context

  return (
    <div
      className={`h-[110px] w-screen bottom-0 flex flex-col ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-slate-300 text-black"
      }`}
    >
      <ul className="flex gap-10 justify-end mr-14 mt-4">
        <Link href="https://github.com/JoeyCollado">
          <Github className="hover:text-blue-700 transition-colors duration-300 cursor-pointer" />
        </Link>
        <Link href="#">
          <Twitter className="hover:text-blue-700 transition-colors duration-300 cursor-pointer" />
        </Link>
        <Link href="https://www.facebook.com/joeyaibert31/">
          <Facebook className="hover:text-blue-700 transition-colors duration-300 cursor-pointer" />
        </Link>
      </ul>
      <p className="text-center pt-10">© All rights reserved to LearnTo 2025</p>
    </div>
  );
};

export default Footer;
