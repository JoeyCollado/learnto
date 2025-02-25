import { Quiz } from "../types/types";
import Image from "next/image";

const QuizCard = ({ quiz, onDelete }: { quiz: Quiz; onDelete: (id: number) => void }) => {
  return (
    <div className="bg-slate-400 shadow-md rounded-lg p-4 text-center flex flex-col justify-between h-full">
      <div>
        <Image 
          src={quiz.image} 
          alt={quiz.title} 
          className="w-full h-[120px] object-cover rounded-md"  
          width={100} 
          height={100} 
        />
        <h2 className="text-lg font-bold mt-2">{quiz.title}</h2>
        <p className="text-gray-600">Subject: {quiz.subject}</p>
        <p className="text-gray-600">Questions: {quiz.questions}</p>
        <p className="text-gray-600 text-sm">Date: {quiz.dateCreated}</p>
      </div>

      {/* ✅ Bottom-aligned buttons */}
      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 w-[50px] h-[30px]">
          ➕ 
        </button>
        <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 w-[50px] h-[30px]">
          📂 
        </button>
        <button 
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 w-[50px] h-[30px]"
          onClick={() => onDelete(quiz.id)}
        >
          🗑 
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
