import { Quiz } from "../types/types";
import { useState } from "react";

const QuizCard = ({ quiz, onDelete }: { quiz: Quiz; onDelete: (id: number) => void }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="bg-slate-400 shadow-md rounded-lg p-4 text-center flex flex-col justify-between h-full">
      <div>
        <h2 className="text-[30px] font-bold mt-2">{quiz.title}</h2>
        <p className="text-gray-600">Subject: {quiz.subject}</p>
        <p className="text-gray-600">Questions: {quiz.questions}</p>
        <p className="text-gray-600 text-sm">Date: {quiz.dateCreated}</p>
      </div>

      {/* ✅ Bottom-aligned buttons with tooltips */}
      <div className="flex justify-between mt-4 relative">
        {/* Add to Collection Button */}
        <div className="relative flex items-center">
          <button 
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md w-[50px] h-[30px]"
            onMouseEnter={() => setHoveredButton("add")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            ➕
          </button>
          {hoveredButton === "add" && (
            <span className="absolute bottom-full mb-2 w-max bg-black text-white text-xs px-2 py-1 rounded-md">
              Add this quiz to collection?
            </span>
          )}
        </div>

        {/* Archive Button */}
        <div className="relative flex items-center">
          <button 
            className="bg-yellow-700 hover:bg-yellow-600 text-white px-3 py-1 rounded-md w-[50px] h-[30px]"
            onMouseEnter={() => setHoveredButton("archive")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            📂
          </button>
          {hoveredButton === "archive" && (
            <span className="absolute bottom-full mb-2 w-max bg-black text-white text-xs px-2 py-1 rounded-md">
              Archive this quiz?
            </span>
          )}
        </div>

        {/* Delete Button */}
        <div className="relative flex items-center">
          <button 
            className="bg-red-600 text-white px-3 py-1 rounded-md w-[50px] h-[30px] hover:bg-red-500"
            onClick={() => onDelete(quiz.id)}
            onMouseEnter={() => setHoveredButton("delete")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            🗑
          </button>
          {hoveredButton === "delete" && (
            <span className="absolute bottom-full mb-2 w-max bg-black text-white text-xs px-2 py-1 rounded-md">
              Delete this quiz?
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;