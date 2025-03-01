"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, ChevronLeft, ChevronRight, Book } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname(); // get current route

  const isActive = (path: string) => pathname === path; // function to check if link is active

  return (
    <>
      {/* Vertical Sidebar */}
      <div
        className={`h-screen mt-[5%] bg-slate-800 text-white transition-all duration-300 z-10 ${
          isOpen ? "w-[200px]" : "w-[85px]"
        } rounded-r-xl  flex-col py-5 relative  md:flex `}
      >
        <div className="flex items-center px-4 ml-3 absolute">
          {isOpen && <Book size={24} className="" />} {/* Icon appears next to Library text when open */}
          <span
            className={`text-3xl ml-3 font-bold transition-all duration-300 ${
              !isOpen && "hidden"
            }`}
          >
            Library
          </span>
        </div>

        <ul className="mt-[130px] space-y-20 px-6">
          <li>
            <Link
              href="/pages/quizArchive/published"
              className={`flex items-center gap-3 hover:bg-blue-700 pl-2 py-2 rounded-md ${
                isActive("/pages/quizArchive/published")
                  ? "bg-blue-700 px-2 py-2"
                  : "hover:bg-blue-700"
              }`}
            >
              <Menu size={20} />
              <span className={`${!isOpen && "hidden"}`}>Published</span>
            </Link>
          </li>
          <li>
            <Link
              href="/pages/quizArchive/drafts"
              className={`flex items-center gap-3 hover:bg-blue-700 pl-2 py-2 rounded-md ${
                isActive("/pages/quizArchive/drafts")
                  ? "bg-blue-700 px-2 py-2"
                  : "hover:bg-blue-700"
              }`}
            >
              <Menu size={20} />
              <span className={`${!isOpen && "hidden"}`}>Drafts</span>
            </Link>
          </li>
          <li>
            <Link
              href="/pages/quizArchive/archived"
              className={`flex items-center gap-3 hover:bg-blue-700 pl-2 py-2 rounded-md ${
                isActive("/pages/quizArchive/archived")
                  ? "bg-blue-700 px-2 py-2"
                  : "hover:bg-blue-700"
              }`}
            >
              <Menu size={20} />
              <span className={`${!isOpen && "hidden"}`}>Archived</span>
            </Link>
          </li>
        </ul>

        {/* Fixed Position Collapse Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute bottom-10 left-4 flex items-center gap-2  text-white px-4 py-2 rounded-lg w-max"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />} 
          {isOpen && <span>Collapse</span>} 
        </button>

        {/* Placeholder icon when sidebar is closed */}
        {!isOpen && (
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
            <Book size={24} />
          </div>
        )}
      </div>

      {/* Bottom Horizontal Sidebar (for small screens) */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-800 text-white flex justify-around py-3 md:hidden text-[10px] z-50 ">
        <Link
          href="/pages/quizArchive/published"
          className={`flex flex-col items-center rounded-md w-[59px] py-1 ${
            isActive("/pages/quizArchive/published")
              ? "bg-blue-700"
              : "hover:bg-blue-700"
          }`}
        >
          <Menu size={20} />
          <span>Published</span>
        </Link>
        <Link
          href="/pages/quizArchive/drafts"
          className={`flex flex-col items-center rounded-md w-[59px] py-1 ${
            isActive("/pages/quizArchive/drafts")
              ? "bg-blue-700"
              : "hover:bg-blue-700"
          }`}
        >
          <Menu size={20} />
          <span>Drafts</span>
        </Link>
        <Link
          href="/pages/quizArchive/archived"
          className={`flex flex-col items-center rounded-md w-[59px] py-1 ${
            isActive("/pages/quizArchive/archived")
              ? "bg-blue-700"
              : "hover:bg-blue-700"
          }`}
        >
          <Menu size={20} />
          <span>Archived</span>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
