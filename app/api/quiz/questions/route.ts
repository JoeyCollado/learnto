import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Question from '@/models/Question';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const quizId = searchParams.get('quizId');
  
  if (quizId) {
    const questions = await Question.find({ quizId }).lean();
    return NextResponse.json(questions);
  }
  
  const questions = await Question.find().lean();
  return NextResponse.json(questions);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { question, options, correctAnswer, quizId } = body;
  
  if (!quizId) {
    return NextResponse.json({ error: 'quizId is required' }, { status: 400 });
  }
  
  const newQuestion = await Question.create({ question, options, correctAnswer, quizId });
  return NextResponse.json(newQuestion, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { id } = body;
  await Question.findByIdAndDelete(id);
  return new NextResponse(null, { status: 204 });
} 