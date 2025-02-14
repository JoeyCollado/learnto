"use client";

import Navbar from '@/app/components/Navbar'
import ThemeToggle from '@/app/components/ThemeToggle';
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
    <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
    <div className=''>
     <span className='text-3xl'>Library</span>

     <div className='flex flex-col h-screen w-fit bg-slate-600  rounded-md p-2'>

      <ul className=''>
        <li>Quiz Created</li>
        <li>Quiz Created</li>
        <li>Quiz Created</li>
        <li>Quiz Created</li>
      </ul>
     </div>

     <div className='absolute flex-row ml-20'>
      <ul className=''>
        <li>Completed</li>
        <li>Drafts</li>
        <li>Archived</li>
      </ul>
     </div>
    </div>
    </>
  )
}

export default page
