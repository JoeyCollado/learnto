import Link from "next/link";
import React from "react";
import { Facebook, Github, Twitter } from "lucide-react";

const Footer = ({isdarkMode}) => {
  return (
    <div className={`h-[110px] w-screen bottom-0 ${isdarkMode ? "bg-slate-800" : "bg-slate-300"}  flex flex-col`}>
      <ul className="flex gap-10 justify-end mr-14 mt-4">
        <Link href="https://github.com/JoeyCollado">
          <Github/>
        </Link>
        <Link href="#">
          <Twitter/>
        </Link>
        <Link href="https://www.facebook.com/joeyaibert31/">
          <Facebook/>
        </Link>
      </ul>
      <p className="text-center pt-10">
        © All rights reserved to LearnTo 2025
      </p>
    </div>
  );
};

export default Footer;
