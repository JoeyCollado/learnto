"use client";

import { useEffect, useState } from "react";
import { Quiz } from "../published/types";
import QuizCard from "@/app/components/QuizCard";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";

const PublishedQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const storedQuizzes = localStorage.getItem("publishedQuizzes");
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  }, []);

  // ✅ Function to delete a quiz
  const handleDeleteQuiz = (quizId: number) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("publishedQuizzes", JSON.stringify(updatedQuizzes));
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* ✅ Sidebar: Fixed position & non-intrusive */}
        <Sidebar  />

        {/* ✅ Content: Leaves space for sidebar, responsive width */}
        <div className="flex-1  p-6 mt-[5%]">
          <div className="bg-slate-600 rounded-md p-6 max-h-[600px] overflow-y-auto custom-scroll">
            <div className="text-center text-3xl py-2 pb-10">Collections</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDeleteQuiz} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishedQuizzes;
