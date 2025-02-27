"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Get URL params
import { Quiz } from "../published/types";
import QuizCard from "@/app/components/QuizCard";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";

const CollectionDetail = () => {
  const { collectionName } = useParams(); // ✅ Get collection name from URL
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    if (collectionName) {
      const storedCollections = JSON.parse(localStorage.getItem("quizCollections") || "{}");
      setQuizzes(storedCollections[collectionName] || []);
    }
  }, [collectionName]);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6 mt-[5%]">
          <div className="bg-slate-600 rounded-md p-6 max-h-[580px] overflow-y-auto custom-scroll">
            <div className="text-center text-3xl py-2 pb-10">{collectionName} Collection</div>

            {quizzes.length === 0 ? (
              <p className="text-center text-white">No quizzes in this collection.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onDelete={() => {}} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionDetail;
