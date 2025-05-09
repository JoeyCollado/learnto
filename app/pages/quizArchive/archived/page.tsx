"use client";

import { useEffect, useState } from "react";
import { Quiz } from "../published/types";
import QuizCard from "@/app/components/QuizCard";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { useTheme } from "@/app/components/theme-context";

const ArchivedQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Fetch data from MongoDB instead of localStorage
    const fetchQuizzes = async () => {
      const response = await fetch('/api/quiz/archived');
      const data = await response.json();
      setQuizzes(data);
    };
    fetchQuizzes();
  }, []);

  // Delete a quiz permanently
  const handleDelete = async (id: number) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(updatedQuizzes);
    // Update MongoDB instead of localStorage
    await fetch('/api/quiz/archived', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-20 mt-[5%] z-10">
          <div className={`${isDarkMode ? "bg-slate-800" : "bg-slate-300"} rounded-md max-h-[580px] overflow-y-auto custom-scroll`}>
            <div className="text-center text-3xl pb-10 mt-10">Archived Quizzes</div>
            {quizzes.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No archived quizzes available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-16 mx-10 gap-5 md:p-5">
                {quizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchivedQuizzes;
