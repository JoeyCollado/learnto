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

  // ✅ Archive function to move quiz to archived list
  const handleArchiveQuiz = (quizId: number) => {
    const quizToArchive = quizzes.find((quiz) => quiz.id === quizId);
    if (!quizToArchive) return;

    // Get archived quizzes from localStorage
    const archivedQuizzes = JSON.parse(localStorage.getItem("archivedQuizzes") || "[]");

    // Update both states and localStorage
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("publishedQuizzes", JSON.stringify(updatedQuizzes));
    localStorage.setItem("archivedQuizzes", JSON.stringify([...archivedQuizzes, quizToArchive]));
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6 mt-[5%]">
          <div className="bg-slate-600 rounded-md p-6 max-h-[580px] overflow-y-auto custom-scroll">
            <div className="text-center text-3xl py-2 pb-10">Published Quizzes</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} onArchive={handleArchiveQuiz} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishedQuizzes;
