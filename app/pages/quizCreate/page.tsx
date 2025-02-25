"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/app/components/theme-context"; // ✅ Import useTheme

const Page = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme(); // ✅ Use global theme state

  const [questions, setQuestions] = useState<
    { id: number; question: string; options: string[] }[]
  >([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizSubject, setQuizSubject] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [quizImage, setQuizImage] = useState("");

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions));

    const savedTitle = localStorage.getItem("quizTitle");
    if (savedTitle) setQuizTitle(savedTitle);

    const savedSubject = localStorage.getItem("quizSubject");
    if (savedSubject) setQuizSubject(savedSubject);

    const savedTimeLimit = localStorage.getItem("timeLimit");
    if (savedTimeLimit) setTimeLimit(savedTimeLimit);

    const savedImage = localStorage.getItem("quizImage");
    if (savedImage) setQuizImage(savedImage);
  }, []);

  const handleDeleteQuestion = (id: number) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, key: string) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
      localStorage.setItem(key, event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // ✅ Use URL instead of base64
      setQuizImage(imageUrl);
      localStorage.setItem("quizImage", imageUrl); // ✅ Store URL instead of large data
    }
  };

  const handlePublish = () => {
    const newQuiz = {
      id: Date.now(),
      title: quizTitle,
      subject: quizSubject,
      time: timeLimit,
      image: quizImage,
      questions: questions.length,
      dateCreated: new Date().toLocaleDateString(),
    };
  
    let existingQuizzes = JSON.parse(localStorage.getItem("publishedQuizzes") || "[]");
  
    if (existingQuizzes.length >= 10) {
      existingQuizzes.shift(); // ✅ Remove oldest quiz if more than 10
    }
  
    localStorage.setItem("publishedQuizzes", JSON.stringify([...existingQuizzes, newQuiz])); // ✅ Store in localStorage
  
    // ✅ Clear temp data
    localStorage.removeItem("quizTitle");
    localStorage.removeItem("quizSubject");
    localStorage.removeItem("timeLimit");
    localStorage.removeItem("quizImage");
    localStorage.removeItem("questions");
  
    setQuizTitle("");
    setQuizSubject("");
    setTimeLimit("");
    setQuizImage("");
    setQuestions([]);
  
    router.push("/pages/quizArchive/published");
  };
  

  return (
    <>
      <div className={`${isDarkMode ? "bg-slate-800" : "bg-slate-300"} ${isDarkMode ? "text-white" : "text-black"} w-[90%] ml-[5%] mt-20 mb-[5%] rounded-lg p-5 overflow-y-auto custom-scroll`} style={{ maxHeight: "90vh" }}>
        <h1 className="text-center text-3xl">Create Quiz Here</h1>

        <div className="buttons flex-row flex gap-2 md:justify-end md:mr-10 justify-center mt-10">
          <button className="bg-blue-800 px-2 rounded-md py-1 hover:bg-blue-500">Generate with AI</button>
          <button className="bg-slate-700 px-2 rounded-md py-1 hover:bg-slate-500" onClick={handlePublish}>Publish</button>
          <button className="bg-slate-700 px-2 rounded-md py-1 hover:bg-slate-500">Preview</button>
        </div>

        <div className={`flex-col flex gap-2 mt-4 ml-10`}>
          <label>Enter Title: <br/><input className={`w-fit p-1 rounded-md text-black`} type="text" value={quizTitle} onChange={handleInputChange(setQuizTitle, "quizTitle")} /></label>
          <label>Enter Subject: <br/><input className="w-fit p-1 rounded-md text-black" type="text" value={quizSubject} onChange={handleInputChange(setQuizSubject, "quizSubject")} /></label>
          <label>Enter Time Limit (in minutes): <br/><input className="w-fit p-1 rounded- text-black" type="number" min="1" value={timeLimit} onChange={handleInputChange(setTimeLimit, "timeLimit")} /></label>
          <label>Upload Image: <br/><input type="file" accept="image/*" onChange={handleImageUpload} /></label>
          {quizImage ? <img src={quizImage} alt="Quiz Preview" className="mt-2 w-32 h-32 object-cover rounded-md" /> : null}
        </div>

        <div className="flex justify-center mt-4">
          <button className="bg-slate-700 px-2 rounded-md py-1" onClick={() => router.push("/pages/quizCreate/addQuestion")}>Add Questions</button>
        </div>

        <div className="questions bg-slate-700 mt-4 p-4 rounded-lg">
          {questions.length === 0 ? (
            <p className="text-center text-gray-300">No questions added yet.</p>
          ) : (
            questions.map((q, index) => (
              <div key={q.id} className="bg-slate-600 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    <span className="text-gray-300 mr-2">Q{index + 1}.</span>
                    {q.question}
                  </h2>
                  <button className="bg-red-500 px-2 text-center pr-10 py-1 rounded-md text-white" onClick={() => handleDeleteQuestion(q.id)}>❌ Delete</button>
                </div>
                <ul className="mt-3 space-y-2">
                  {q.options.map((option, idx) => (
                    <li key={idx} className="ml-6 text-gray-200">
                      <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
