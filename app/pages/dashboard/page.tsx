"use client";

import React from "react";
import { useEffect, useState } from "react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Fetch theme from MongoDB instead of localStorage
    const fetchTheme = async () => {
      const response = await fetch('/api/theme');
      const data = await response.json();
      setIsDarkMode(data.theme === "dark");
      document.documentElement.classList.toggle("dark", data.theme === "dark");
    };
    fetchTheme();
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:text-7xl text-5xl text-center mt-20 h-screen">
        LearnTo
      </div>
      <Footer/>
    </>
  );
};

export default Page;
