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
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 absolute md:ml-[25%] ml-[26%]">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};

export default PublishedQuizzes;
