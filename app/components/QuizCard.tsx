import { Quiz } from "../types/types";
import Image from "next/image";

const QuizCard = ({ quiz, onDelete }: { quiz: Quiz; onDelete: (id: number) => void }) => {
  return (
    <div className="bg-slate-400 shadow-md rounded-lg p-4 text-center relative">
      <Image src={quiz.image} alt={quiz.title} className="w-full h-[120px] object-cover rounded-md" width={100} height={100} />
      <h2 className="text-lg font-bold mt-2">{quiz.title}</h2>
      <p className="text-gray-600">Subject: {quiz.subject}</p>
      <p className="text-gray-600">Questions: {quiz.questions}</p>
      <p className="text-gray-600 text-sm">Time limit: {quiz.time} minutes</p>
      <p className="text-gray-600 text-sm">Date: {quiz.dateCreated}</p>

      {/* ✅ Delete button */}
      <button 
        className="absolute w-10 h-10 bottom-0 right-2 bg-red-500/90 text-white px-2 py-1 rounded-lg hover:bg-red-600"
        onClick={() => onDelete(quiz.id)}
      >
        X
      </button>
    </div>
  );
};

export default QuizCard;
