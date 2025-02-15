"use client";

import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="z-50 ">
      <Navbar />

      <main>{children}</main>
      <div className="">
      <Sidebar />
      </div>
    </div>
  );
}
