"use client";

import Navbar from '@/app/components/Navbar'
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
  
  
  return (
    <>
    <Navbar isDarkMode={isDarkMode}/>
    <div className='text-center text-4xl mt-20 h-screen'>
     <div className='bg-slate-500 w-[90%] ml-[5%] h-[90%] rounded-lg mb-[5%]'>
        
        </div>
    </div>
    </>
  )
}

export default page
