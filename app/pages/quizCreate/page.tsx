"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/app/components/theme-context";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDarkMode } = useTheme();

  const [questions, setQuestions] = useState<
    { _id: string; question: string; options: string[] }[]
  >([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizSubject, setQuizSubject] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);

  useEffect(() => {
    // Get quizId from URL or create new quiz
    const existingQuizId = searchParams.get('quizId');
    if (existingQuizId === 'null' || existingQuizId === null) {
      router.replace('/pages/quizCreate');
      return;
    }
    if (existingQuizId) {
      setQuizId(existingQuizId);
      // Fetch existing quiz data
      const fetchQuiz = async () => {
        const response = await fetch(`/api/quiz?id=${existingQuizId}`);
        const data = await response.json();
        if (data) {
          setQuizTitle(data.title || '');
          setQuizSubject(data.subject || '');
          setTimeLimit(data.time || '');
        }
      };
      fetchQuiz();
    } else {
      // Create new quiz only if no quizId exists
      const createNewQuiz = async () => {
        const response = await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: '',
            subject: '',
            time: '',
            questions: [],
            dateCreated: new Date().toLocaleDateString(),
            status: 'draft'
          }),
        });
        const data = await response.json();
        if (data && data._id) {
          setQuizId(data._id);
          // Update URL with new quizId
          router.replace(`/pages/quizCreate?quizId=${data._id}`);
        }
      };
      createNewQuiz();
    }
  }, [searchParams, router]);

  useEffect(() => {
    // Fetch questions for this quiz
    const fetchQuestions = async () => {
      if (!quizId) return;
      const response = await fetch(`/api/quiz/questions?quizId=${quizId}`);
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, [quizId]);

  const handleDeleteQuestion = async (id: string) => {
    const updatedQuestions = questions.filter((q) => q._id !== id);
    setQuestions(updatedQuestions);
    await fetch('/api/quiz/questions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, key: string) =>
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
      if (!quizId) return;
      
      await fetch('/api/quiz', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: quizId,
          [key]: event.target.value 
        }),
      });
    };

  const handlePublish = async () => {
    if (!quizId) return;
    
    if (!quizTitle.trim() || !quizSubject.trim() || !timeLimit.trim()) {
      alert("Please fill in all the fields before publishing.");
      return;
    }

    if (questions.length === 0) {
      alert("Please create at least one question before publishing.");
      return;
    }

    await fetch('/api/quiz/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: quizId,
        title: quizTitle,
        subject: quizSubject,
        time: timeLimit,
        questions: questions.length,
        dateCreated: new Date().toLocaleDateString(),
        status: 'published'
      }),
    });

    setQuizTitle("");
    setQuizSubject("");
    setTimeLimit("");
    setQuestions([]);
    setQuizId(null);

    router.push("/pages/quizArchive/published");
  };

  const handleSaveDraft = async () => {
    if (!quizId) return;
    
    try {
      const response = await fetch('/api/quiz/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: quizId,
          title: quizTitle,
          subject: quizSubject,
          time: timeLimit,
          questions: questions.map(q => q._id),
          dateCreated: new Date().toLocaleDateString(),
          status: 'draft'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save draft');
      }

      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 3000);
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft. Please try again.');
    }
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
          className={`${draftSaved ? 'bg-green-500' : 'bg-yellow-500'} px-2 rounded-md py-1 hover:bg-yellow-400`}
          onClick={handleSaveDraft}
        >
          {draftSaved ? '✅ Draft Saved!' : 'Save Draft'}
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
            onChange={handleInputChange(setQuizTitle, "title")}
          />
        </label>
        <label>
          Enter Subject: <br />
          <input
            className="w-fit p-1 rounded-md text-black"
            type="text"
            value={quizSubject}
            onChange={handleInputChange(setQuizSubject, "subject")}
          />
        </label>
        <label>
          Enter Time Limit (in minutes): <br />
          <input
            className="w-fit p-1 rounded-md text-black"
            type="number"
            min="1"
            value={timeLimit}
            onChange={handleInputChange(setTimeLimit, "time")}
          />
        </label>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-orange-600 hover:bg-orange-500 px-2 rounded-md py-1"
          onClick={() => router.push(`/pages/quizCreate/addQuestion?quizId=${quizId}`)}
        >
          Add Questions
        </button>
      </div>

      <div className={`questions ${isDarkMode ? "bg-slate-900" : "bg-slate-200"} mt-4 p-4 rounded-lg`}>
        {questions.length === 0 ? (
          <p className="text-center text-gray-300">No questions added yet.</p>
        ) : (
          questions.map((q, index) => (
            <div key={q._id} className={`${isDarkMode ? "bg-slate-700" : "bg-slate-100"} p-6 rounded-lg mb-6  `}>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  <span className={` ${isDarkMode ? "text-white" : "text-black"} mr-2`}>Q{index + 1}.</span>
                  {q.question}
                </h2>
                <button
                  className="bg-red-700 hover:bg-red-600 px-2 text-center pr-10 py-1 rounded-md text-white"
                  onClick={() => handleDeleteQuestion(q._id)}
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
