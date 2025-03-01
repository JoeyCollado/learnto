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

  // ✅ Function to add quiz to a collection
  const handleAddToCollection = (quiz: Quiz) => {
    const collectionName = prompt("Enter collection name:");
    if (!collectionName) return;

    // Get existing collections from localStorage
    const collections = JSON.parse(localStorage.getItem("quizCollections") || "{}");

    // Add quiz to selected collection
    if (!collections[collectionName]) {
      collections[collectionName] = [];
    }
    collections[collectionName].push(quiz);

    // Save to localStorage
    localStorage.setItem("quizCollections", JSON.stringify(collections));
    alert(`Quiz added to "${collectionName}" collection!`);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6 mt-[5%] z-10">
          <div className="bg-slate-800 rounded-md p-6 max-h-[580px] overflow-y-auto custom-scroll">
            <div className="text-center text-3xl py-2 pb-10">Published Quizzes</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} onDelete={() => {}} onAddToCollection={handleAddToCollection} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishedQuizzes;
