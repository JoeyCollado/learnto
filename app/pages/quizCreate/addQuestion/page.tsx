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

    // Reset correct answer if it's deleted
    if (correctOption === index) {
      setCorrectOption(null);
    } else if (correctOption !== null && correctOption > index) {
      setCorrectOption(correctOption - 1); // Adjust index after deletion
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
      correctAnswer: options[correctOption], // Store the correct answer
    };

    const savedQuestions = JSON.parse(localStorage.getItem("questions") || "[]");
    savedQuestions.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(savedQuestions));

    router.push("/quizCreate");
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
        <div
          key={index}
          className={`w-[80%] flex items-center gap-2 mb-2 p-2 rounded-md ${
            correctOption === index ? "bg-green-300" : "bg-gray-200"
          }`}
          onClick={() => setCorrectOption(index)} // Set as correct when clicked
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
              e.stopPropagation(); // Prevent triggering correct answer selection
              handleDeleteOption(index);
            }}
            disabled={options.length <= 1} // Prevent deleting last option
          >
            ✖
          </button>
        </div>
      ))}

      <button className="bg-green-600 px-4 py-2 rounded-md mt-2" onClick={handleAddOption}>
        + Add Option
      </button>

      <button className="bg-blue-600 px-4 py-2 rounded-md mt-4" onClick={handleSubmit}>
        ✅ Save Question
      </button>

      <button className="bg-red-600 px-4 py-2 rounded-md mt-2" onClick={() => router.push("/quizCreate")}>
        ❌ Cancel
      </button>
    </div>
  );
};

export default AddQuestion;
