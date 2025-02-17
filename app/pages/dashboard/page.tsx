"use client";

import React from "react";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useEffect, useState } from "react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      setIsDarkMode(prefersDarkMode);
      document.documentElement.classList.toggle("dark", prefersDarkMode);
    }
  }, []);

  return (
    <>
      <Navbar isDarkMode={isDarkMode}/>
      <div className="text-6xl text-center mt-20 h-screen">
        LearnTo
      </div>
      <Footer/>
    </>
  );
};

export default Page;
