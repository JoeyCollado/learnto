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

    <div className='buttons flex-row flex gap-2 md:justify-end md:mr-10 justify-center mt-10'>
       <button className='bg-slate-700 px-2 rounded-md py-1 flex '>Publish</button>
       <button className='bg-slate-700 px-2 rounded-md py-1 flex'>Preview</button>
    </div>

   </div>
    </>
  )
}

export default page
