"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router
import { Quiz } from "../published/types";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";

const Collections = () => {
  const [collections, setCollections] = useState<{ [key: string]: Quiz[] }>({});
  const router = useRouter(); // ✅ Use router for navigation

  useEffect(() => {
    const storedCollections = localStorage.getItem("quizCollections");
    if (storedCollections) {
      setCollections(JSON.parse(storedCollections));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6 mt-[5%]">
          <div className="bg-slate-600 rounded-md p-6 max-h-[580px] overflow-y-auto custom-scroll">
            <div className="text-center text-3xl py-2 pb-10">Collections</div>

            {Object.keys(collections).length === 0 ? (
              <p className="text-center text-white">No collections available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Object.entries(collections).map(([name, quizzes]) => (
                  <div
                    key={name}
                    className="bg-slate-500 p-4 rounded-lg shadow-md cursor-pointer hover:bg-slate-400 transition"
                    onClick={() => router.push(`/collections/${encodeURIComponent(name)}`)} // ✅ Navigate to details page
                  >
                    <h2 className="text-white text-xl font-bold">{name}</h2>
                    <p className="text-gray-300 text-sm">{quizzes.length} quizzes</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
