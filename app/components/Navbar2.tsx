import React from "react";
import ThemeToggle from "./ThemeToggle"; // Ensure the correct path
import Link from "next/link";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar2: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div
      className={`h-12 w-screen top-0 z-10 absolute flex items-center justify-between px-4 ${
        isDarkMode ? "bg-slate-700" : "bg-slate-300"
      }`}
    >
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="items">
        <ul className="flex flex-row md:gap-36 gap-7 md:ml-60">
        
        </ul>
      </div>
    </div>
  );
};

export default Navbar2;
