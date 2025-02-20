"use client";
import { useEffect, useState } from "react";
import { Quiz } from "../published/types";
import QuizCard from "@/app/components/QuizCard";

const PublishedQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetch("/datas/published.json")
      .then((res) => res.json())
      .then((data: Quiz[]) => setQuizzes(data))
      .catch((error) => console.error("Failed to fetch quizzes:", error));
  }, []);

  return (
    <div className="absolute md:ml-[25%] md:w-3/5 md:mt-3  h-[600px] w-[60%] ml-[20%] bg-slate-600 rounded-md p-6 mt-[5%]">
      {/* Scrollable container with hidden scrollbar */}
      <div className="overflow-y-auto max-h-full custom-scroll">
        {/* Responsive grid layout for quiz cards */}
        <div className="text-center text-3xl py-2 pb-10">
          Archived Quizzes
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublishedQuizzes;
