"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/app/components/theme-context";

const Page = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const [questions, setQuestions] = useState<
    { id: number; question: string; options: string[] }[]
  >([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizSubject, setQuizSubject] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions));

    const savedTitle = localStorage.getItem("quizTitle");
    if (savedTitle) setQuizTitle(savedTitle);

    const savedSubject = localStorage.getItem("quizSubject");
    if (savedSubject) setQuizSubject(savedSubject);

    const savedTimeLimit = localStorage.getItem("timeLimit");
    if (savedTimeLimit) setTimeLimit(savedTimeLimit);
  }, []);

  const handleDeleteQuestion = (id: number) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, key: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
      localStorage.setItem(key, event.target.value);
    };

  const handlePublish = () => {
    if (!quizTitle.trim() || !quizSubject.trim() || !timeLimit.trim()) {
      alert("Please fill in all the fields before publishing.");
      return;
    }

    if (questions.length === 0) {
      alert("Please create at least one question before publishing.");
      return;
    }

    const newQuiz = {
      id: Date.now(),
      title: quizTitle,
      subject: quizSubject,
      time: timeLimit,
      questions: questions.length,
      dateCreated: new Date().toLocaleDateString(),
    };

    let existingQuizzes = JSON.parse(
      localStorage.getItem("publishedQuizzes") || "[]"
    );

    if (existingQuizzes.length >= 10) {
      existingQuizzes.shift();
    }

    localStorage.setItem(
      "publishedQuizzes",
      JSON.stringify([...existingQuizzes, newQuiz])
    );

    localStorage.removeItem("quizTitle");
    localStorage.removeItem("quizSubject");
    localStorage.removeItem("timeLimit");
    localStorage.removeItem("questions");

    setQuizTitle("");
    setQuizSubject("");
    setTimeLimit("");
    setQuestions([]);

    router.push("/pages/quizArchive/published");
  };

  const handleSaveDraft = () => {
    const newDraft = {
      id: Date.now(),
      title: quizTitle,
      subject: quizSubject,
      time: timeLimit,
      questions: questions,
      dateCreated: new Date().toLocaleDateString(),
    };

    let existingDrafts = JSON.parse(
      localStorage.getItem("draftQuizzes") || "[]"
    );

    localStorage.setItem(
      "draftQuizzes",
      JSON.stringify([...existingDrafts, newDraft])
    );

    alert("✅ Draft saved successfully!");
  };

  return (
    <div
      className={`${isDarkMode ? "bg-slate-800" : "bg-slate-300"} ${
        isDarkMode ? "text-white" : "text-black"
      } w-[90%] ml-[5%] mt-20 mb-[5%] rounded-lg p-5 overflow-y-auto custom-scroll`}
      style={{ maxHeight: "90vh" }}
    >
      <h1 className="text-center text-3xl">Create Quiz Here</h1>

      <div className="buttons flex-row flex gap-2 md:justify-end md:mr-10 justify-center mt-10">
        <button className="bg-blue-800 px-2 rounded-md py-1 hover:bg-blue-500">
          Generate with AI
        </button>
        <button
          className="bg-yellow-500 px-2 rounded-md py-1 hover:bg-yellow-400"
          onClick={handleSaveDraft}
        >
          Save Draft
        </button>

        <button
          className="bg-green-600 px-2 rounded-md py-1 hover:bg-green-500"
          onClick={handlePublish}
        >
          Publish
        </button>
        <button className="bg-purple-700 px-2 rounded-md py-1 hover:bg-purple-600">
          Preview
        </button>
      </div>

      <div className={`flex-col flex gap-2 mt-4 md:ml-[5%] ml-[30%]`}>
        <label>
          Enter Title: <br />
          <input
            className={`w-fit p-1 rounded-md text-black`}
            type="text"
            value={quizTitle}
            onChange={handleInputChange(setQuizTitle, "quizTitle")}
          />
        </label>
        <label>
          Enter Subject: <br />
          <input
            className="w-fit p-1 rounded-md text-black"
            type="text"
            value={quizSubject}
            onChange={handleInputChange(setQuizSubject, "quizSubject")}
          />
        </label>
        <label>
          Enter Time Limit (in minutes): <br />
          <input
            className="w-fit p-1 rounded-md text-black"
            type="number"
            min="1"
            value={timeLimit}
            onChange={handleInputChange(setTimeLimit, "timeLimit")}
          />
        </label>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-orange-600 hover:bg-orange-500 px-2 rounded-md py-1"
          onClick={() => router.push("/pages/quizCreate/addQuestion")}
        >
          Add Questions
        </button>
      </div>

      <div className={`questions ${isDarkMode ? "bg-slate-900" : "bg-slate-200"} mt-4 p-4 rounded-lg`}>
        {questions.length === 0 ? (
          <p className="text-center text-gray-300">No questions added yet.</p>
        ) : (
          questions.map((q, index) => (
            <div key={q.id} className={`${isDarkMode ? "bg-slate-700" : "bg-slate-100"} p-6 rounded-lg mb-6  `}>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  <span className="text-gray-700 mr-2">Q{index + 1}.</span>
                  {q.question}
                </h2>
                <button
                  className="bg-red-700 hover:bg-red-600 px-2 text-center pr-10 py-1 rounded-md text-white"
                  onClick={() => handleDeleteQuestion(q.id)}
                >
                  ❌ Delete
                </button>
              </div>

              {/* Display Options Below Question */}
              <ul className={`mt-3 pl-5 ${isDarkMode ? "text-white" : "text-black"}`}>
                {q.options.map((option, optIndex) => (
                  <li key={optIndex} className="flex items-center">
                    <span className="font-bold mr-2">
                      {String.fromCharCode(97 + optIndex)}.
                    </span>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
