import mongoose, { Schema, models, model } from "mongoose";

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  quizId: { type: String }, // or Number, depending on your logic
}, { timestamps: true });

export default models.Question || model("Question", QuestionSchema); 