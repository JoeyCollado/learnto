import { Link } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="h-40 w-screen bottom-0 bg-slate-600 flex flex-col">
      <ul className="flex gap-10 justify-end mr-10 mt-2">
        <Link>
          <li>Facebook</li>
        </Link>
        <Link>
          <li>Facebook</li>
        </Link>
        <Link>
          <li>Facebook</li>
        </Link>
      </ul>
      <p className="text-center bottom-0 pt-24">
        © All rights reserved LearnTo 2025{" "}
      </p>
    </div>
  );
};

export default Footer;
