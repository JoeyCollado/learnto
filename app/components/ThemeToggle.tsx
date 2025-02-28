"use client";

import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./theme-context";

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use ThemeContext

  return (
    <button
      onClick={toggleTheme}
      className={`absolute top-[15px] mr-36 right-10 md:top-[15px] md:right-auto md:left-72 w-9 h-[20px] ${
        isDarkMode ? "bg-white" : "bg-slate-900"
      } rounded-lg z-50 flex items-center px-1 transition-all duration-300 border-2 ${
        isDarkMode ? "border-yellow-500" : "border-blue-500"
      }`}
    >
      <div
          className={`w-5 h-5 flex items-center justify-center rounded-full transition-transform duration-300 ${
            isDarkMode ? "translate-x-[-5px]" : "translate-x-2"
          }`}
      >
        {isDarkMode ? (
          <SunIcon size={14} className="text-yellow-500" />
        ) : (
          <MoonIcon size={14} className="text-blue-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
