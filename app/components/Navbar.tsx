import React from 'react';
import ThemeToggle from './ThemeToggle'; // Ensure the correct path

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className={`h-12 w-screen top-0 z-10 absolute flex items-center justify-between px-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Navbar;
