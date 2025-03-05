import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-[110px] w-screen bottom-0 bg-slate-800 flex flex-col">
      <ul className="flex gap-10 justify-end mr-10 mt-2">
        <Link href="#">
          <li>Facebook</li>
        </Link>
        <Link href="#">
          <li>Facebook</li>
        </Link>
        <Link href="#">
          <li>Facebook</li>
        </Link>
      </ul>
      <p className="text-center bottom-0 pt-10">
        © All rights reserved to LearnTo 2025{" "}
      </p>
    </div>
  );
};

export default Footer;
