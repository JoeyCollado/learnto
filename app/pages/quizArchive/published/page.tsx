import React from "react";

const quizzes = [
  {
    id: 1,
    image: "/jakeeeeee.png",
    title: "Sample Quiz 1",
    questions: 10,
    subject: "Mathematics",
    dateCreated: "2025-02-14",
    creator: "John Doe",
  },
  
  {
    id: 2,
    image: "/jakeeeeee.png",
    title: "Science Basics",
    questions: 15,
    subject: "Science",
    dateCreated: "2025-02-13",
    creator: "Jane Smith",
  },
  {
    id: 3,
    image: "/jakeeeeee.png",
    title: "History Trivia",
    questions: 8,
    subject: "History",
    dateCreated: "2025-02-12",
    creator: "Alice Johnson",
  },
  
];

const QuizCard = ({ quiz }) => {
  return (
    <div className="bg-slate-300 rounded-lg shadow-md p-4 flex flex-col items-center">
      <img src={quiz.image} alt={quiz.title} className="w-24 h-24 rounded-full mb-3" />
      <h2 className="text-lg font-semibold">{quiz.title}</h2>
      <p className="text-gray-600">{quiz.subject}</p>
      <p className="text-gray-500">{quiz.questions} Questions</p>
      <p className="text-gray-400 text-sm">Created by {quiz.creator}</p>
      <p className="text-gray-400 text-sm">{quiz.dateCreated}</p>
    </div>
  );
};

const PublishedQuizzes = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};

const Page = () => {
  return (
    <div className='md:ml-[25%] absolute md:w-3/5 w-screen h-[600px] mt-4 bg-slate-600 rounded-md p-6 overflow-auto'>
      <PublishedQuizzes />
    </div>
  );
};

export default Page;
