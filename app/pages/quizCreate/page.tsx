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
   
   <div className='bg-slate-500 h-screen w-[90%] ml-[5%] mt-20 rounded-lg'>
    <h1 className='text-center pt-10 text-3xl'>Create Quiz Here</h1>
   </div>
    </>
  )
}

export default page
