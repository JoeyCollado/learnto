import mongoose, { Schema, models, model } from "mongoose";

const QuizSchema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  time: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  dateCreated: { type: String, required: true },
  status: { type: String, enum: ["published", "draft", "archived"], default: "draft" },
}, { timestamps: true });

export default models.Quiz || model("Quiz", QuizSchema); 