"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
    },
  ]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions));

    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      setIsDarkMode(prefersDarkMode);
      document.documentElement.classList.toggle("dark", prefersDarkMode);
    }
  }, []);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} />

      <div className="bg-slate-500 h-screen mb-[5%] w-[90%] ml-[5%] mt-20 rounded-lg p-5">
        <h1 className="text-center text-3xl">Create Quiz Here</h1>

        <div className="buttons flex-row flex gap-2 md:justify-end md:mr-10 justify-center mt-10">
          <button className="bg-slate-700 px-2 rounded-md py-1">Publish</button>
          <button className="bg-slate-700 px-2 rounded-md py-1">Preview</button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-slate-700 px-2 rounded-md py-1"
            onClick={() => router.push("/pages/quizCreate/addQuestion")}
          >
            Add Questions
          </button>
        </div>

        {/* Questions Container */}
        <div className="questions bg-slate-700 mt-4 p-4 rounded-lg">
          {questions.map((q, index) => (
            <div key={index} className="bg-slate-600 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{q.question}</h2>
              <ul className="mt-2">
                {q.options.map((option, idx) => (
                  <li key={idx} className="ml-4">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
