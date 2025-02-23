"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddQuestion = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) return;

    const newQuestion = {
      id: Date.now(),
      question,
      options: options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`),
    };

    const savedQuestions = JSON.parse(localStorage.getItem("questions") || "[]");
    savedQuestions.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(savedQuestions));

    router.push("/");
  };

  return (
    <div className="bg-slate-500 h-screen w-full flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl mb-5">Add a New Question</h1>

      <input
        type="text"
        placeholder="Enter question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-[80%] p-2 rounded-md mb-3"
      />

      {options.map((opt, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${String.fromCharCode(65 + index)}`}
          value={opt}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          className="w-[80%] p-2 rounded-md mb-2"
        />
      ))}

      <button
        className="bg-green-600 px-4 py-2 rounded-md mt-2"
        onClick={handleAddOption}
      >
        Add Option
      </button>

      <button
        className="bg-blue-600 px-4 py-2 rounded-md mt-4"
        onClick={handleSubmit}
      >
        Save Question
      </button>

      <button
        className="bg-red-600 px-4 py-2 rounded-md mt-2"
        onClick={() => router.push("/")}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddQuestion;
