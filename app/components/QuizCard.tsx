import { Quiz } from "./types";

const QuizCard = ({ quiz }: { quiz: Quiz }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={quiz.image} alt={quiz.title} className="w-full h-32 object-cover rounded-md" />
      <h2 className="text-lg font-bold mt-2">{quiz.title}</h2>
      <p className="text-gray-600">Subject: {quiz.subject}</p>
      <p className="text-gray-600">Questions: {quiz.questions}</p>
      <p className="text-gray-400 text-sm">Created by: {quiz.creator}</p>
      <p className="text-gray-400 text-sm">Date: {quiz.dateCreated}</p>
    </div>
  );
};

export default QuizCard;
