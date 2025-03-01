import { Quiz } from "../types/types";
import { useState } from "react";

const QuizCard = ({
  quiz,
  onDelete,
  onArchive,
  onAddToCollection, // ✅ New function prop
}: {
  quiz: Quiz;
  onDelete: (id: number) => void;
  onArchive?: (id: number) => void;
  onAddToCollection?: (quiz: Quiz) => void; // ✅ Function accepts quiz object
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="bg-sky-600 hover:bg-sky-500 shadow-md rounded-lg p-4 text-center flex flex-col justify-between h-full">
      <div>
        <h2 className="text-[30px] font-bold mt-2">{quiz.title}</h2>
        <p className={`text-gray-700`}>Subject: {quiz.subject}</p>
        <p className="text-gray-700">Time Limit: {quiz.time || "No time limit"} minutes</p>
        <p className="text-gray-700">Questions: {quiz.questions}</p>
        <p className="text-gray-700 text-sm">Date: {quiz.dateCreated}</p>
      </div>

      {/* ✅ Bottom-aligned buttons with tooltips */}
      <div className="flex gap-2 justify-center mt-4">

        {/* Archive Button */}
        <div className="relative flex items-center">
          <button 
            className="bg-yellow-700 hover:bg-yellow-600 text-white px-3 py-1 rounded-md w-[50px] h-[30px]"
            onClick={() => onArchive && onArchive(quiz.id)}
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
