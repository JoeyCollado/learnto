"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname(); //get current route

  const isActive = (path: string) => pathname === path; //function to check if link is active

  return (
    <>
      {/* Vertical Sidebar */}
      <div
        className={`h-screen mt-[5%] bg-slate-700 text-white transition-all duration-300 ${
          isOpen ? "w-[200px]" : "w-20"
        } rounded-r-xl flex flex-col py-5 relative hidden md:flex `}
      >
        <div className="flex items-center justify-between px-4">
          <span
            className={`text-3xl ml-2 font-bold transition-all duration-300 ${
              !isOpen && "hidden"
            }`}
          >
            Library
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-slate-600"
          >
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <ul className="mt-20 space-y-20 px-6 ">
          <li>
            <Link
              href="/pages/quizArchive/published"
              className={`flex items-center gap-3 hover:bg-blue-700 hover:px-2 py-2 rounded-md ${
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
              className={`flex items-center gap-3 hover:bg-blue-700 hover:px-2 py-2 rounded-md ${
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
              className={`flex items-center gap-3 hover:bg-blue-700 hover:px-2 py-2 rounded-md ${
                isActive("/pages/quizArchive/archived")
                  ? "bg-blue-700 px-2 py-2"
                  : "hover:bg-blue-700"
              }`}
            >
              <Menu size={20} />
              <span className={`${!isOpen && "hidden"}`}>Archived</span>
            </Link>
          </li>
          <li>
            <Link
              href="/pages/quizArchive/collections"
              className={`flex items-center gap-3 hover:bg-blue-700 hover:px-2 py-2 rounded-md ${
                isActive("/pages/quizArchive/collections")
                  ? "bg-blue-700 px-2 py-2"
                  : "hover:bg-blue-700"
              }`}
            >
              <Menu size={20} />
              <span className={`${!isOpen && "hidden"}`}>Collections</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Horizontal Sidebar (for small screens) */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-700 text-white flex justify-around py-3 md:hidden text-[10px]">
        <Link href="/pages/quizArchive/published" className={`flex flex-col items-center rounded-md w-[59px] py-1 ${
                isActive("/pages/quizArchive/published")
                  ? "bg-blue-700"
                  : "hover:bg-blue-700"
              }`}>
          <Menu size={20} />
          <span>Published</span>
        </Link>
        <Link href="/pages/quizArchive/drafts" className={`flex flex-col items-center rounded-md w-[59px] py-1 ${
                isActive("/pages/quizArchive/drafts")
                  ? "bg-blue-700"
                  : "hover:bg-blue-700"
              }`}>
          <Menu size={20} />
          <span>Drafts</span>
        </Link>
        <Link href="/pages/quizArchive/archived" className={`flex flex-col items-center rounded-md w-[59px] py-1 ${
                isActive("/pages/quizArchive/archived")
                  ? "bg-blue-700"
                  : "hover:bg-blue-700"
              }`}>
          <Menu size={20} />
          <span>Archived</span>
        </Link>
        <Link href="/pages/quizArchive/collections" className={`flex flex-col items-center rounded-md w-[59px] py-1 ${
                isActive("/pages/quizArchive/collections")
                  ? "bg-blue-700"
                  : "hover:bg-blue-700"
              }`}>
          <Menu size={20} />
          <span>Collections</span>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
