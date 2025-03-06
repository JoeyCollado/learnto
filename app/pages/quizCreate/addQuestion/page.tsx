"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddQuestion = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctOption, setCorrectOption] = useState<number | null>(null);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);

    if (correctOption === index) {
      setCorrectOption(null);
    } else if (correctOption !== null && correctOption > index) {
      setCorrectOption(correctOption - 1);
    }
  };

  const handleSubmit = () => {
    if (!question.trim() || options.some((opt) => !opt.trim()) || correctOption === null) {
      alert("Please fill in all fields and select a correct answer.");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      question,
      options,
      correctAnswer: options[correctOption],
    };

    const savedQuestions = JSON.parse(localStorage.getItem("questions") || "[]");
    savedQuestions.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(savedQuestions));

    router.push("/pages/quizCreate");
  };

  return (
    <div className="bg-blue-900 h-screen w-full flex flex-col items-center justify-center p-5 text-black">
      <h1 className={`text-3xl mb-5 text-white`}>Add a New Question</h1>

      <p className="mb-2 text-gray-200 font-semibold">Enter your question here:</p>
      <input
        type="text"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-[80%] p-2 rounded-md mb-3 border border-gray-300 focus:border-blue-500 outline-none"
      />

      {/* Instruction for selecting a correct answer */}
      <p className="mb-2 text-gray-200 font-semibold">Click an option to select the correct answer.</p>

      {options.map((opt, index) => (
        <div
          key={index}
          className={`w-[80%] flex items-center gap-2 mb-2 p-2 rounded-md cursor-pointer transition-all duration-300 ${
            correctOption === index ? "bg-green-300 border border-green-600" : "bg-gray-200"
          }`}
          onClick={() => setCorrectOption(index)}
        >
          <input
            type="text"
            placeholder={`Option ${String.fromCharCode(65 + index)}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-grow p-2 rounded-md bg-transparent outline-none"
          />
          {correctOption === index && <span className="text-green-800 font-semibold">✔ Correct Answer</span>}
          <button
            className="bg-red-500 px-3 py-1 rounded-md text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteOption(index);
            }}
            disabled={options.length <= 1}
          >
            ✖
          </button>
        </div>
      ))}

      <button className="bg-green-600 px-4 py-2 rounded-md mt-2 text-white" onClick={handleAddOption}>
        + Add Option
      </button>

      <button className="bg-blue-600 px-4 py-2 rounded-md mt-4" onClick={handleSubmit}>
        ✅ Save Question
      </button>

      <button className="bg-red-600 px-4 py-2 rounded-md mt-2" onClick={() => router.push("/pages/quizCreate")}>
        ❌ Cancel
      </button>
    </div>
  );
};

export default AddQuestion;
