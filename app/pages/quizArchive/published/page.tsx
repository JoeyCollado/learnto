"use client";

import { useEffect, useState } from "react";
import { Quiz } from "./types";
import QuizCard from "@/app/components/QuizCard";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { useTheme } from "@/app/components/theme-context";

const PublishedQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const storedQuizzes = localStorage.getItem("publishedQuizzes");
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("publishedQuizzes", JSON.stringify(updatedQuizzes));
  };
  

  // Archive a quiz
  const handleArchive = (id: number) => {
    const storedPublishedQuizzes = JSON.parse(localStorage.getItem("publishedQuizzes") || "[]");
    const quizToArchive = storedPublishedQuizzes.find((quiz: Quiz) => quiz.id === id);

    if (!quizToArchive) return;

    // Remove from published quizzes
    const updatedPublishedQuizzes = storedPublishedQuizzes.filter((quiz: Quiz) => quiz.id !== id);
    localStorage.setItem("publishedQuizzes", JSON.stringify(updatedPublishedQuizzes));

    // Add to archived quizzes
    const archivedQuizzes = JSON.parse(localStorage.getItem("archivedQuizzes") || "[]");
    localStorage.setItem("archivedQuizzes", JSON.stringify([...archivedQuizzes, quizToArchive]));

    // Update state
    setQuizzes(updatedPublishedQuizzes);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-20 mt-[5%] z-10">
          <div className={`${isDarkMode ? "bg-slate-800" : "bg-slate-300"} rounded-md max-h-[580px] overflow-y-auto custom-scroll`}>
            <div className="text-center text-3xl pb-10 mt-10">Published Quizzes</div>
            {quizzes.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No published quizzes available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-16 mx-10 gap-5 md:p-5">
                {quizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onArchive={handleArchive} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishedQuizzes;
