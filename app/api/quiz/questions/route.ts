export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Question from '@/models/Question';
import Quiz from '@/models/Quiz';

export async function GET(req: NextRequest) {
  try {
    console.log('GET /api/quiz/questions: Connecting to database...');
    await connectToDatabase();
    console.log('GET /api/quiz/questions: Connected!');
    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get('quizId');
    console.log('GET /api/quiz/questions: quizId =', quizId);
    if (quizId) {
      const questions = await Question.find({ quizId }).lean();
      console.log('GET /api/quiz/questions: Found questions for quizId', quizId, questions);
      return NextResponse.json(questions);
    }
    const questions = await Question.find().lean();
    console.log('GET /api/quiz/questions: Found all questions', questions);
    return NextResponse.json(questions);
  } catch (error) {
    console.error('GET /api/quiz/questions error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('POST /api/quiz/questions: Connecting to database...');
    await connectToDatabase();
    console.log('POST /api/quiz/questions: Connected! Parsing body...');
    const body = await req.json();
    console.log('POST /api/quiz/questions: Body:', body);
    const { question, options, correctAnswer, quizId } = body;
    if (!quizId) {
      console.log('POST /api/quiz/questions: No quizId!');
      return NextResponse.json({ error: 'quizId is required' }, { status: 400 });
    }
    console.log('POST /api/quiz/questions: Creating question...');
    const newQuestion = await Question.create({ question, options, correctAnswer, quizId });
    console.log('POST /api/quiz/questions: Question created:', newQuestion);
    await Quiz.findByIdAndUpdate(
      quizId,
      { $push: { questions: newQuestion._id } }
    );
    console.log('POST /api/quiz/questions: Quiz updated!');
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error('POST /api/quiz/questions error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log('DELETE /api/quiz/questions: Connecting to database...');
    await connectToDatabase();
    console.log('DELETE /api/quiz/questions: Connected! Parsing body...');
    const body = await req.json();
    console.log('DELETE /api/quiz/questions: Body:', body);
    const { id } = body;
    await Question.findByIdAndDelete(id);
    console.log('DELETE /api/quiz/questions: Question deleted:', id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/quiz/questions error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}