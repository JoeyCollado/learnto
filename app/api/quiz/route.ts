import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    const quiz = await Quiz.findById(id).populate('questions').lean();
    return NextResponse.json(quiz);
  }
  const quizzes = await Quiz.find().populate('questions').lean();
  return NextResponse.json(quizzes);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { title, subject, time, questions, dateCreated, status } = body;
  const newQuiz = await Quiz.create({ title, subject, time, questions, dateCreated, status });
  return NextResponse.json(newQuiz, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { id, ...update } = body;
  const updatedQuiz = await Quiz.findByIdAndUpdate(id, update, { new: true });
  return NextResponse.json(updatedQuiz);
} 