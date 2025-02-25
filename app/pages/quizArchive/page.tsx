"use client";

import Navbar from '@/app/components/Navbar';
import ThemeToggle from '@/app/components/ThemeToggle';
import Sidebar from '@/app/components/Sidebar';
import { useTheme } from '@/app/components/theme-context';
import React from 'react';

const Page = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // ✅ Use global theme state

  return (
    <>
      <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className={`${isDarkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-black"} min-h-screen p-4`}>
        <Navbar />
        <Sidebar />
        <h1 className="text-3xl font-bold text-center mt-10">Your Page Content</h1>
      </div>
    </>
  );
};

export default Page;
