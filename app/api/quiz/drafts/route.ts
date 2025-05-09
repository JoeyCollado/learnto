import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export async function GET() {
  await connectToDatabase();
  const drafts = await Quiz.find({ status: 'draft' }).populate('questions').lean();
  return NextResponse.json(drafts);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { id, title, subject, time, questions, dateCreated } = body;
  
  // Update existing quiz if id is provided
  if (id) {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, subject, time, questions, dateCreated, status: 'draft' },
      { new: true }
    );
    return NextResponse.json(updatedQuiz);
  }
  
  // Create new quiz if no id provided
  const newDraft = await Quiz.create({
    title,
    subject,
    time,
    questions,
    dateCreated,
    status: 'draft'
  });
  return NextResponse.json(newDraft, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { id } = body;
  await Quiz.findByIdAndDelete(id);
  return new NextResponse(null, { status: 204 });
} 