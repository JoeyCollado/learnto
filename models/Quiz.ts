import mongoose, { Schema, models, model } from "mongoose";

const QuizSchema = new Schema({
  title: { type: String, required: false },
  subject: { type: String, required: false },
  time: { type: String, required: false },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  dateCreated: { type: String, required: true },
  status: { type: String, enum: ["published", "draft", "archived"], default: "draft" },
}, { timestamps: true });

export default models.Quiz || model("Quiz", QuizSchema); 