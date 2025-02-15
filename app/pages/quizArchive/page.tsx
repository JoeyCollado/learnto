"use client";

import Navbar from '@/app/components/Navbar'
import ThemeToggle from '@/app/components/ThemeToggle';
import Sidebar from '@/app/components/Sidebar';
import React from 'react'
import { useState, useEffect } from 'react';

const page = () => {

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
  
    const toggleTheme = () => {
      setIsDarkMode((prev) => !prev);
      const newTheme = !isDarkMode ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
  return (
    <>
    <Navbar isDarkMode={isDarkMode}/>
    <Sidebar/>
    <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
    
    </>
  )
}

export default page
