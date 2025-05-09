import React, { useState } from "react";

export default function QuestionForm({ onSave }: { onSave: (q: any) => void }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  return (
    <div className="p-4 bg-gray-100 rounded">
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Question"
        className="block mb-2 p-1 rounded"
      />
      {options.map((opt, i) => (
        <div key={i} className="flex mb-1">
          <input
            value={opt}
            onChange={e => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
            placeholder={`Option ${i + 1}`}
            className="p-1 rounded flex-1"
          />
          <input
            type="radio"
            checked={correctAnswer === opt}
            onChange={() => setCorrectAnswer(opt)}
            className="ml-2"
          />
        </div>
      ))}
      <button onClick={() => setOptions([...options, ""])} className="bg-blue-300 px-2 rounded mb-2">Add Option</button>
      <button
        onClick={() => onSave({ question, options, correctAnswer })}
        className="bg-green-500 px-2 rounded"
      >
        Save Question
      </button>
    </div>
  );
} 